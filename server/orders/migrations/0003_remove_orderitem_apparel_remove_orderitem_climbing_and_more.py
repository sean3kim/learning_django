# Generated by Django 4.0.4 on 2022-05-05 19:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
        ('orders', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='apparel',
        ),
        migrations.RemoveField(
            model_name='orderitem',
            name='climbing',
        ),
        migrations.AddField(
            model_name='orderitem',
            name='product',
            field=models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='products.product'),
        ),
    ]