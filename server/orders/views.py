from django.conf import settings
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views import View
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import json
import stripe

from .permissions import IsOwner
from .models import Order, OrderItem, ShippingAddress
from .serializers import OrderSerializer, OrderItemSerializer, ShippingAddressSerializer

from products.models import Product
from .models import OrderItem

# Create your views here.

'''
order views
'''
class OrderListCreateView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        print(self.request)
        return super().get_queryset()

# ok want to return active order, but the format is for 
class OrderDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_object(self):
        lookup = self.kwargs['pk']
        queryset = self.filter_queryset(self.get_queryset())
        if lookup == 'active':
            filter_kwargs = {'customer': self.request.user, 'active': True}

            active_exists = Order.objects.filter(
                customer__username=self.request.user
            ).filter(active=True).exists()

            '''
                had to turn off react strict mode because it was creating two orders with active=True and was causing get_object
                or 404 to fail since it can only return 1 object but 2 exists
            '''
            if active_exists:
                # if there is an active order for the user, retrieve it
                obj = get_object_or_404(queryset, **filter_kwargs)
                self.check_object_permissions(self.request, obj)
            else:
                # else create a new active order
                serializer = self.get_serializer(data={'customer': self.request.user, 'active': True})
                serializer.is_valid(raise_exception=True)
                obj = serializer.save()
            return obj
        return super().get_object()

'''
order item views
'''
class OrderItemListCreateView(generics.ListCreateAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            self.perform_create(serializer)
        except IntegrityError as e:
            raise IntegrityError(e.__cause__)
        return Response(serializer.data)

# removed IsOwner permission -- need to revisit if i need it or not
class OrderItemDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]

    # def get_object(self):
    #     lookup = self.lookup_field
    #     id = self.kwargs['pk']
    #     print('kwargs', self.kwargs)
    #     i = Product.objects.get(id=id)
    #     obj = i.orderitem
    #     print('hasattr', hasattr(obj, 'orderitem'))
    #     print('reverse relation from product', obj)
    #     self.check_object_permissions(self.request, obj)
    #     pass

'''
shipping address views
'''
class ShippingAddressListCreateView(generics.ListCreateAPIView):
    queryset = ShippingAddress.objects.all()
    serializer_class = ShippingAddressSerializer
    permission_classes = [IsAuthenticated]

class ShippingAddressDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ShippingAddress.objects.all()
    serializer_class = ShippingAddressSerializer
    permission_classes = [IsAuthenticated, IsOwner]
    lookup_field = 'pk'



stripe.api_key = settings.STRIPE_SECRET_KEY

class StripeIntentView(View):
    def post(self, request, *args, **kwargs):
        print('in stripeintentview post')
        try:
            # request.body is a bytestring and need json.loads to turn it into an actual dictionary
            data = json.loads(request.body)
            # from a list of orderItem ids, get all the orderItem instances and populate the product field so that another database hit doesn't occur when doing object_instance.product
            objects = OrderItem.objects.select_related('product').filter(id__in=data['items'])
            total = 0
            for e in objects:
                total += e.product.price * e.quantity * 100
            # Create a PaymentIntent with the order amount and currency
            intent = stripe.PaymentIntent.create(
                amount=int(total),
                currency='usd',
                # automatic_payment_methods={
                #     'enabled': True,
                # },
            )
            return JsonResponse({
                'clientSecret': intent['client_secret']
            })
            # return JsonResponse({'testing': 'hello'})
        except Exception as e:
            return JsonResponse({'error': str(e)})