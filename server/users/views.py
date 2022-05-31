from django.contrib.auth.hashers import make_password
from rest_framework import generics
from rest_framework.response import Response
from django.middleware import csrf
from rest_framework.permissions import IsAuthenticated

from .models import MyUser
from .serializers import UserSerializer

from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken

# overridden validate method handles reading the refresh token from httponly cookie and passes that value into super.validate
class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None
    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh_token')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise InvalidToken('No valid token found in cookie \'refresh_token\'')

# these two views move the refresh token into an httponly cookie
# the access token will be in the header 
# still need to figure out how to refresh -- maybe in validation where the access token is checked?
#   if access token has expired get the refresh token from cookie and get a new access token
class CookieTokenObtainPairView(TokenObtainPairView):
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get('refresh'):
            cookie_max_age = 3600 * 24 * 14 # 14 days
            response.set_cookie('refresh_token', response.data['refresh'], max_age=cookie_max_age, httponly=True, samesite='None', secure=True, domain='contactpdx.com')
            del response.data['refresh']
        if response.data.get('access'):
            access_cookie_max_age = 60*5 # 5 min
            response.set_cookie('access_token', response.data['access'], max_age=access_cookie_max_age, httponly=True, samesite='None', secure=True, domain='contactpdx.com')
            del response.data['access']
        csrf.get_token(request)
        return super().finalize_response(request, response, *args, **kwargs)

# finalize_response is from APIView just before sending off the data
#   removing refresh token from data and attaching an httponly cookie with the refresh token
class CookieTokenRefreshView(TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        refresh = response.data.get('refresh')

        # if either refresh or access is none, means there was a problem with validating and refreshing
        if refresh is not None:
            if response.data.get('refresh'):
                cookie_max_age = 3600 * 24 * 14 # 14 days
                response.set_cookie('refresh_token', response.data['refresh'], max_age=cookie_max_age, httponly=True, samesite='None', secure=True, domain='contactpdx.com')
                del response.data['refresh']
            if response.data.get('access'):
                access_cookie_max_age = 60*5 # 5 min
                response.set_cookie('access_token', response.data['access'], max_age=access_cookie_max_age, httponly=True, samesite='None', secure=True, domain='contactpdx.com')
                del response.data['access']
        else:
            response.set_cookie('refresh_token', '', max_age=0, httponly=True, samesite='None', secure=True, domain='contactpdx.com')
            response.set_cookie('access_token', '', max_age=0, httponly=True, samesite='None', secure=True, domain='contactpdx.com')

        return super().finalize_response(request, response, *args, **kwargs)


'''
login view
filter the queryset based on username and add in a random email 
return the user
'''
class LoginView(generics.GenericAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        qs = self.get_queryset()
        user = qs.filter(username=request.data['username']).first()
        # user.email = 'test@test.com'
        serializer = UserSerializer(user)
        return Response(serializer.data)

'''
logout view
blacklist the refresh token 
set new refresh and access tokens to expire immediately
'''
class LogoutView(generics.GenericAPIView):
    # removed IsAuthenticated from permission_classes because if access_token expires wasn't able to logout
    #    which i don't think is the right functionality. if the user has a refresh_token available, technically logged in
    permission_classes = []

    def post(self, request, *args, **kwargs):
        refresh = request.COOKIES.get('refresh_token')
        RefreshToken(refresh).blacklist()

        res = Response()
        res.set_cookie('refresh_token', '', max_age=0, httponly=True, samesite='None', secure=True, domain='contactpdx.com')
        res.set_cookie('access_token', '', max_age=0, httponly=True, samesite='None', secure=True, domain='contactpdx.com')
        return res

'''
this view just returns the current user
IsAuthenticated permission will do the validation of whether or not a user is currently logged in or not
'''
class IsLoggedInView(generics.GenericAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    # lookup_field = 'pk'

    # there is AuthenticationMiddleware in django that adds user to request object
    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


'''
in order to follow restful conventions, going to use these pairs:
    list/create
    detail/update/delete

GET  bookshop/authors/ - lists all authors
POST bookshop/authors/ - creates an author
GET  bookshop/authors/1/ - gets author with id=1
PUT  bookshop/authors/1/ - updates author with id=1
DELETE bookshop/authors/1/ - deletes author with id=1

POST bookshop/authors/<author>/books/ - creates a book for an author
GET  bookshop/authors/<author>/books/<book> - gets a book
'''
class UserListCreateView(generics.ListCreateAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        pw = serializer.validated_data['password']
        serializer.validated_data['password'] = make_password(pw)
        serializer.validated_data.pop('confirm')
        return super().perform_create(serializer)


class UserDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'

