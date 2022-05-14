from django.db import models
from users.models import MyUser
from products.models import Product


class Order(models.Model):
    customer = models.ForeignKey(MyUser, on_delete=models.CASCADE, blank=True, null=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    transaction_id = models.CharField(max_length=100, null=True)
    active = models.BooleanField(default=False)

    def __str__(self):
        return str(self.transaction_id)

class OrderItem(models.Model):
    product = models.OneToOneField(Product, related_name='orderitem', on_delete=models.CASCADE, default=None)
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.product)

class ShippingAddress(models.Model):
    customer = models.ForeignKey(MyUser, on_delete=models.CASCADE, blank=True, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, blank=True, null=True)
    address = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    zip = models.CharField(max_length=200)

    def __str__(self):
        return self.address