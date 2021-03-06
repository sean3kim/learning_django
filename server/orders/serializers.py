from rest_framework import serializers
from .models import Order, OrderItem, ShippingAddress
from products.serializers import ProductSerializer
from products.models import Product
from users.models import MyUser
from orders.models import Order
from server.utils import is_valid_state
import re


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
    customer = serializers.SlugRelatedField(queryset=MyUser.objects.all(), many=False, slug_field='username')
    items = OrderItemSerializer(read_only=True, many=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'items', 'active', 'date_ordered']


class ActiveOrderSerializer(serializers.ModelSerializer):
    customer = serializers.SlugRelatedField(many=False, read_only=True, slug_field='username')
    items = serializers.PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'items', 'active', 'date_ordered']
        read_only_fields = ['active']
    

class ShippingAddressSerializer(serializers.ModelSerializer):
    customer = serializers.SlugRelatedField(queryset=MyUser.objects.all(), many=False, slug_field='username')

    # might need to change this to 1-1 field in model
    order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all(), many=False)

    class Meta:
        model = ShippingAddress
        fields = ['id', 'customer', 'order', 'address', 'state', 'city', 'zip']

    def validate_address(self, value):
        # expecting a string with '<numbers> <anything> <anything>'
        split_address = value.split()
        match = re.search('^[0-9]*$', split_address[0])
        if len(split_address) != 3 or not match:
            raise serializers.ValidationError("please enter an address '<numbers> <anything> <anything>' format", 400)
        return value

    def validate_state(self, value):
        if len(value) != 2:
            raise serializers.ValidationError('please enter 2 letter state abbreviation', 400)
        if not is_valid_state(value):
            raise serializers.ValidationError('not a valid state', 400)
        return value

    def validate_zip(self, value):
        if len(value) != 5:
            raise serializers.ValidationError('zip code must be a 5 digit number', 400)
        return value