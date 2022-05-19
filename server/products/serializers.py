from rest_framework import serializers
from .models import Apparel, Climbing, Tag, Product, Image

from reviews.serializers import ReviewSerializer

class TagSerializer(serializers.ModelSerializer):
    apparel_related = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')
    climbing_related = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')

    class Meta:
        model = Tag
        fields = ['id', 'name', 'apparel_related', 'climbing_related']

'''
tag and tag_name:
    tag is write_only for when submitting data to be created. it will see pk in url (per urls.py) and create the relationship between the tag and created product
    tag_name is readonly and gets its value from tag.name (which is referring to the model and not the tag field above it)

    so - tag pk is being received and not sent, tag_name is not recieved but sent out
'''
class ApparelSerializer(serializers.ModelSerializer):
    tag = serializers.SlugRelatedField(queryset=Tag.objects.all(), write_only=True, slug_field='name')
    tag_name = serializers.ReadOnlyField(source='tag.name')

    class Meta:
        model = Apparel
        fields = ['id', 'name', 'price', 'description', 'quantity', 'size', 'gender', 'tag', 'tag_name']


class ClimbingSerializer(serializers.ModelSerializer):
    tag = serializers.SlugRelatedField(queryset=Tag.objects.all(), write_only=True, slug_field='name')
    tag_name = serializers.ReadOnlyField(source='tag.name')

    class Meta:
        model = Climbing
        fields = ['id', 'name', 'price', 'description', 'quantity', 'tag', 'tag_name']


class ImageSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), write_only=True, many=False)
    product_related = serializers.SlugRelatedField(read_only=True, many=False, slug_field='name')

    class Meta:
        model = Image
        fields = ['id', 'name', 'product', 'product_related', 'image', 'default']
        read_only_fields = ['default']


class ProductSerializer(serializers.ModelSerializer):
    tag = serializers.SlugRelatedField(queryset=Tag.objects.all(), write_only=True, slug_field='name')
    tag_name = serializers.ReadOnlyField(source='tag.name')
    size = serializers.CharField(source='apparel.size', max_length=100, read_only=True, required=False)
    gender = serializers.CharField(source='apparel.gender', max_length=100, read_only=True, required=False)
    images = ImageSerializer(many=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'description', 'quantity', 'images', 'tag', 'tag_name', 'size', 'gender', 'reviews']