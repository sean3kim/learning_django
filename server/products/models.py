from django.db import models

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.FloatField(default=0.00)
    description = models.TextField()
    quantity = models.IntegerField(default=0)
    
    '''
    in the case of abstract base class and ForeignKey/ManyToMany, need to have child specific related_name and related_query_name
    related_name will be apparel_related/climbing_related
    related_query_name will be apparels/climbings
    '''
    tag = models.ForeignKey('Tag', related_name="%(class)s_related", related_query_name="%(class)ss", on_delete=models.CASCADE)
    # reviews = models.OneToMany() // review can be only for one product and products can have many reviews

    class Meta:
        abstract = True

'''
subclass of Product for apparel items
'''
class Apparel(Product):

    small = 'small'
    medium = 'medium'
    large = 'large'
    xlarge = 'xlarge'
    SIZE_CHOICES = [
        (small, 'S'),
        (medium, 'M'),
        (large, 'L'),
        (xlarge, 'XL'),
    ]

    mens = 'mens'
    womens = 'womens'
    other = 'other'
    GENDER_CHOICES = [
        (mens, 'mens'),
        (womens, 'womens'),
        (other, 'other'),
    ]

    size = models.CharField(max_length=50, choices=SIZE_CHOICES)
    gender = models.CharField(max_length=50, choices=GENDER_CHOICES)

    def __str__(self):
        return self.name

'''
subclass of Product for climbing related items
'''
class Climbing(Product):
    def __str__(self):
        return self.name

'''
separate model for tags, onetomany relationship from both apparel and climbing
in the configuration below, can't add new tags from frontend
    would have to add it to this list in the backend to add new tags
    made it this way because new tags won't be added very often 
'''
class Tag(models.Model):
    shirts = 'shirts'
    pants = 'pants'
    sweaters = 'sweaters'
    chalk_bags = 'chalk_bags'
    chalk_buckets = 'chalk_buckets'
    brushes = 'brushes'
    bottles = 'bottles'
    NAMES = [
        (shirts, 'shirts'),
        (pants, 'pants'),
        (sweaters, 'sweaters'),
        (chalk_bags, 'chalk bags'),
        (chalk_buckets, 'chalk buckets'),
        (brushes, 'brushes'),
        (bottles, 'bottles'),
    ]

    name = models.CharField(max_length=100, choices=NAMES)

    def __str__(self):
        return self.name

'''
maybe this can be in a separate app
can also think of this as a comment 

this will actually be related to both user and product
product - manytomany on Product model
user - onetomany on Review model
'''
# class Review(models.Model):
#     title = models.CharField(max_length=200)
#     body = models.TextField()
#     rating = models.PositiveIntegerField(default=0)
#     # user

#     def __str__(self):
#         return self.title