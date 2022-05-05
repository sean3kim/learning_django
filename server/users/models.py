from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class MyUserManager(BaseUserManager):

    def create_user(self, username, email, password, **other_fields):
        if not email:
            raise ValueError("must provide an email address")

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **other_fields)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, username, email, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('super user must have is_staff set to true')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('super user must have is_superuser set to true')
        return self.create_user(username, email, password, **other_fields)

'''
subclassing PermissionsMixin allows this custom user to plug into django's permissions framework
'''
class MyUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=128, unique=True)
    first_name = models.CharField(max_length=128, blank=True)
    last_name = models.CharField(max_length=128, blank=True)
    about = models.TextField(blank=True)
    created = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = MyUserManager()

    USERNAME_FIELD = 'username'     # this is the default but writing it out because the field is necessary
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username