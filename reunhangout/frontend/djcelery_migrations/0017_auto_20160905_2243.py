# -*- coding: utf-8 -*-
# Generated by Django 1.9.9 on 2016-09-05 22:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djcelery', '0016_auto_20160905_2242'),
    ]

    operations = [
        migrations.AlterField(
            model_name='taskmeta',
            name='status',
            field=models.CharField(choices=[('RETRY', 'RETRY'), ('REVOKED', 'REVOKED'), ('RECEIVED', 'RECEIVED'), ('STARTED', 'STARTED'), ('SUCCESS', 'SUCCESS'), ('FAILURE', 'FAILURE'), ('PENDING', 'PENDING')], default='PENDING', max_length=50, verbose_name='state'),
        ),
    ]
