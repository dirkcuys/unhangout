# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-07-27 17:28
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('breakouts', '0003_auto_20160330_2226'),
    ]

    operations = [
        migrations.AddField(
            model_name='breakout',
            name='is_random',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='breakout',
            name='members',
            field=models.ManyToManyField(blank=True, related_name='member_of_breakouts', to=settings.AUTH_USER_MODEL),
        ),
    ]
