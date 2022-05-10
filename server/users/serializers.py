from rest_framework import serializers
from .models import MyUser

from orders.serializers import OrderSerializer
from orders.models import Order

'''
when serializing foreign key relationships
    the one side serializer needs many=True
        user can have many orders
    the many side serializer needs many=False
        orders can only have 1 user/owner

also setting password and confirm to write_only so that they don't get sent to front end, even in encrypted form
'''
class UserSerializer(serializers.ModelSerializer):
    confirm = serializers.CharField(max_length=32, write_only=True)
    # order = OrderSerializer(source='order_set', read_only=True, many=True)
    order = serializers.SerializerMethodField()

    class Meta:
        model = MyUser
        fields = ['id', 'email', 'username', 'password', 'confirm', 'first_name', 'last_name', 'order', 'about', 'is_staff']
        extra_kwargs = {'password': {'write_only': True}, 'confirm': {'write_only': True}}

    '''
    when a user logs in OR when login status is checked:
        returns the active order if any or None
    '''
    def get_order(self, obj):
        qs = Order.objects.filter(customer__id=obj.id)
        if qs.count():
            try:
                active_order = qs.get(active=True)
            except:
                return None
        else:
            return None
        serializer = OrderSerializer(active_order)
        return serializer.data

    def validate(self, data):
        if data['password'] != data['confirm']:
            raise serializers.ValidationError("passwords must match")
        return data
