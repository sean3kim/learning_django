from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import MyUser

# Register your models here.

class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username')
    search_fields = ('email', 'username')
    fieldsets = (
        (None, {'fields': ('email', 'password', 'username', 'first_name', 'last_name', 'created')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        ('Personal', {'fields': ('about',)}),
    )
    add_fieldsets = (
        (None, {'fields': ('email', 'username', 'password1', 'password2', 'is_staff', 'is_active')}),
    )

admin.site.register(MyUser, CustomUserAdmin)