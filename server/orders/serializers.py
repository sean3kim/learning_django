from rest_framework import serializers
from rest_framework.exceptions import NotFound
from .models import Order, OrderItem, ShippingAddress
from products.serializers import ApparelSerializer, ClimbingSerializer, ProductSerializer
from products.models import Apparel, Climbing, Product


'''
want to input an id to serializer in order to link the apparel/climbing to existing objects
but on output/serialization want to return whole apparel/climbing object

*** need to figure out how to combine apparel/climbing into product
'''
class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), write_only=True, many=False, required=False)
    product_related = ProductSerializer(source='product', read_only=True, many=False)
    order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all(), many=False)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_related', 'order', 'quantity', 'date_added']

    def validate(self, data):
        '''make sure order item quantity is less than product quantity (how many in stock)'''
        in_stock = data['product'].quantity
        if in_stock < int(self.initial_data['quantity']):
            # the data included in validation error shows up as response.data in exception handler
            raise serializers.ValidationError({'message': 'cannot order more of the item than is in stock'}, 400)
        return super().validate(data)


'''
here just send back the pks of the items and get the correct items in react store
'''
class OrderSerializer(serializers.ModelSerializer):
    customer = serializers.SlugRelatedField(many=False, read_only=True, slug_field='username')
    items = OrderItemSerializer(read_only=True, many=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'items', 'active', 'date_ordered', 'transaction_id']
        read_only_fields = ['active']


class ActiveOrderSerializer(serializers.ModelSerializer):
    customer = serializers.SlugRelatedField(many=False, read_only=True, slug_field='username')
    items = serializers.PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'items', 'active', 'date_ordered', 'transaction_id']
        read_only_fields = ['active']
    

class ShippingAddressSerializer(serializers.ModelSerializer):
    customer = serializers.SlugRelatedField(many=False, read_only=True, slug_field='username')

    class Meta:
        model = ShippingAddress
        fields = ['id', 'customer', 'address', 'state', 'city', 'zip']