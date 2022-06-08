from this import d
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Apparel, Climbing, Tag, Product
from .serializers import ApparelSerializer, ClimbingSerializer, ImageSerializer, TagSerializer, ProductSerializer
from .permissions import IsAdminOrReadOnly

import cloudinary.uploader

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

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        deleted_item = serializer.data
        self.perform_destroy(instance)
        return Response(deleted_item)

'''
Apparel views
'''
class ApparelListCreateView(generics.ListCreateAPIView):
    queryset = Apparel.objects.all()
    serializer_class = ApparelSerializer
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    '''
    this one is busted and needs to be refactored:
    exploring a little bit, need to override the serializers create, not the views
        to do this need to add images to apparel serializer
        which would then require the client form to send an explicit 'images' field
        which would then require a way to figure out how to stringify a list of images in react
    '''
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        prod = self.perform_create(serializer)

        image_array_data = []
        for key,value in request.data.items():
            if key.startswith('image'):
                print(f'image {key} -- {value}')
                image_array_data.append({
                    'name': prod.name,
                    'product': prod.id,
                    'image': value,
                    'default': True
                })
                # uploaded_image = cloudinary.uploader.upload(value)
                # print('data from cloudinary upload', uploaded_image)
        # if no images were provided need to still provide data but with the image field missing
        #   if the image field is present, default is not set
        if len(image_array_data) == 0:
            image_array_data.append({
                'name': 'default',
                'product': prod.id,
                'default': True
            })

        print('image array data', image_array_data)
        imageSerializer = ImageSerializer(data=image_array_data, many=True)
        imageSerializer.is_valid(raise_exception=True)
        self.perform_create(imageSerializer)
        headers = self.get_success_headers(serializer.data)
        obj = Product.objects.get(id=prod.id)
        prod_obj = ProductSerializer(obj)
        return Response(prod_obj.data, headers=headers)
        
    def perform_create(self, serializer):
        return serializer.save()

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
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        prod = self.perform_create(serializer)

        image_array_data = []
        for key,value in request.data.items():
            if key.startswith('image'):
                image_array_data.append({
                    'name': prod.name,
                    'product': prod.id,
                    'image': value,
                    'default': True
                })
        # if no images were provided need to still provide data but with the image field missing
        #   if the image field is present, default is not set
        if len(image_array_data) == 0:
            image_array_data.append({
                'name': 'default',
                'product': prod.id,
                'default': True
            })

        imageSerializer = ImageSerializer(data=image_array_data, many=True)
        imageSerializer.is_valid(raise_exception=True)
        self.perform_create(imageSerializer)
        headers = self.get_success_headers(serializer.data)
        obj = Product.objects.get(id=prod.id)
        prod_obj = ProductSerializer(obj)
        return Response(prod_obj.data, headers=headers)

    def perform_create(self, serializer):
        return serializer.save()

        

class ClimbingDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Climbing.objects.all()
    serializer_class = ClimbingSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        deleted_item = serializer.data
        self.perform_destroy(instance)
        return Response(deleted_item)


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