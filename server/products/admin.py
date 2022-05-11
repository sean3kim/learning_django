from django.contrib import admin
from . import models

# Register your models here.

admin.site.register(models.Product)
admin.site.register(models.Apparel)
admin.site.register(models.Climbing)
admin.site.register(models.Tag)
admin.site.register(models.Image)