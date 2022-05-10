from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .permissions import IsOwner
from .models import Order, OrderItem, ShippingAddress
from .serializers import OrderSerializer, OrderItemSerializer, ShippingAddressSerializer

from products.models import Product

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
            filter_kwargs = {'active': True}
            obj = get_object_or_404(queryset, **filter_kwargs)
            self.check_object_permissions(self.request, obj)
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
        print(serializer.validated_data)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
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

# create a custom permission for IsOwner
class ShippingAddressDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ShippingAddress.objects.all()
    serializer_class = ShippingAddressSerializer
    permission_classes = [IsAuthenticated, IsOwner]