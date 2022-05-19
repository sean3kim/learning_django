from rest_framework import serializers
from .models import Review

from users.models import MyUser
from products.models import Product

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(queryset=MyUser.objects.all(), many=False, slug_field='username')
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), many=False)

    class Meta:
        model = Review
        fields = ['id', 'title', 'body', 'rating', 'user', 'product']