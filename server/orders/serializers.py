from rest_framework import serializers
from .models import Order, OrderItem, ShippingAddress
from products.serializers import ApparelSerializer, ClimbingSerializer
from products.models import Apparel, Climbing


'''
want to input an id to serializer in order to link the apparel/climbing to existing objects
but on output/serialization want to return whole apparel/climbing object

*** need to figure out how to combine apparel/climbing into product
'''
class OrderItemSerializer(serializers.ModelSerializer):
    apparel = serializers.PrimaryKeyRelatedField(queryset=Apparel.objects.all(), write_only=True, many=False, required=False)
    climbing = serializers.PrimaryKeyRelatedField(queryset=Climbing.objects.all(), write_only=True, many=False, required=False)
    apparel_related = ApparelSerializer(source='apparel', read_only=True, many=False)
    climbing_related = ClimbingSerializer(source='climbing', read_only=True, many=False)
    order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all(), many=False)

    class Meta:
        model = OrderItem
        fields = ['id', 'apparel', 'climbing', 'apparel_related', 'climbing_related', 'order', 'quantity', 'date_added']

class OrderSerializer(serializers.ModelSerializer):
    customer = serializers.SlugRelatedField(many=False, read_only=True, slug_field='username')
    # items = OrderItemSerializer(read_only=True, many=True)
    items = serializers.PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'items', 'date_ordered', 'transaction_id']
    

class ShippingAddressSerializer(serializers.ModelSerializer):
    customer = serializers.SlugRelatedField(many=False, read_only=True, slug_field='username')

    class Meta:
        model = ShippingAddress
        fields = ['id', 'customer', 'address', 'state', 'city', 'zip']