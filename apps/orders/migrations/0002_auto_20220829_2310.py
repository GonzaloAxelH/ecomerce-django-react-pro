# Generated by Django 3.1.7 on 2022-08-30 04:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='country_region',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='order',
            name='date_issued',
            field=models.DateTimeField(default=datetime.datetime(2022, 8, 29, 23, 10, 57, 917890)),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='orderitem',
            name='date_added',
            field=models.DateTimeField(default=datetime.datetime(2022, 8, 29, 23, 10, 57, 918887)),
        ),
    ]
