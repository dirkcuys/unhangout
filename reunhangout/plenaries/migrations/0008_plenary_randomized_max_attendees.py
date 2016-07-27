# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-07-27 17:28
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plenaries', '0007_auto_20160726_1427'),
    ]

    operations = [
        migrations.AddField(
            model_name='plenary',
            name='randomized_max_attendees',
            field=models.IntegerField(default=10, validators=[django.core.validators.MinValueValidator(2), django.core.validators.MaxValueValidator(10)]),
        ),
    ]
