# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-09-06 19:11
from __future__ import unicode_literals

from django.db import migrations, models
import plenaries.models


class Migration(migrations.Migration):

    dependencies = [
        ('plenaries', '0024_auto_20170831_1707'),
    ]

    operations = [
        migrations.AddField(
            model_name='plenary',
            name='etherpad_initial_text',
            field=models.TextField(blank=True, default=plenaries.models.get_etherpad_default_text, null=True),
        ),
    ]
