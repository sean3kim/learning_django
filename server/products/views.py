from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Apparel, Climbing, Tag, Product
from .serializers import ApparelSerializer, ClimbingSerializer, TagSerializer, ProductSerializer
from .permissions import IsAdminOrReadOnly

# Create your views here.

'''
Product Views
'''
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]

class ProductDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'pk'

'''
Apparel views
'''
class ApparelListCreateView(generics.ListCreateAPIView):
    queryset = Apparel.objects.all()
    serializer_class = ApparelSerializer
    permission_classes = [IsAdminOrReadOnly]

class ApparelDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Apparel.objects.all()
    serializer_class = ApparelSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'pk'

    ''' 
    something weird going on here
    without the deleted_item line and just returning serializer.data, id becomes NULL
    but with the deleted_item line serializer.data.id has a value
    seems like perform_destroy is doing something to the serializer data
    '''
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        deleted_item = serializer.data
        self.perform_destroy(instance)
        return Response(deleted_item)

# the get_queryset method is grabbing the keyword argument named tag (from urls.py) and filter Apparel for any items with that tag
class ApparelByTagListView(generics.ListAPIView):
    serializer_class = ApparelSerializer

    def get_queryset(self):
        tag = self.kwargs['tag']
        return Apparel.objects.filter(tag__name=tag)

'''
Climbing views
'''
class ClimbingListCreateView(generics.ListCreateAPIView):
    queryset = Climbing.objects.all()
    serializer_class = ClimbingSerializer
    permission_classes = [IsAdminOrReadOnly]

class ClimbingDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Climbing.objects.all()
    serializer_class = ClimbingSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'pk'


'''
Tag views
'''
class TagListCreateView(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAdminOrReadOnly]

# is this view needed if the tags are preset? might just need a ListView and DetailView
class TagDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'pk'