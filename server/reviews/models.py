from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from users.models import MyUser
from products.models import Product

# Create your models here.

class Review(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    rating = models.PositiveIntegerField(
        default=0,
        blank=True,
        null=True,
        validators=[MaxValueValidator(5), MinValueValidator(0)])
    
    # user should be one to many, one user can leave many reviews
    user = models.ForeignKey(MyUser, related_name='reviews', on_delete=models.CASCADE)

    # product should also be one to many, one product can have many reviews but one review can't have multiple products
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)


    def __str__(self):
        return self.title