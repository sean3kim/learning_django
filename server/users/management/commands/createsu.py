from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from users.models import MyUser


class Command(BaseCommand):

    def handle(self, *args, **options):
        if not MyUser.objects.filter(username="admin").exists():
            MyUser.objects.create_superuser("admin", "admin@admin.com", "admin")