# -*- coding: utf-8 -*-
# Generated by Django 1.9.9 on 2016-10-05 14:51
from __future__ import unicode_literals

import datetime
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plenaries', '0014_auto_20161003_2122'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='plenary',
            name='open',
        ),
        migrations.AddField(
            model_name='plenary',
            name='canceled',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='plenary',
            name='doors_close',
            field=models.DateTimeField(default=datetime.datetime(2017, 1, 1, 0, 0), help_text='When should the lobby be closed, ending chat?'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='plenary',
            name='doors_open',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 1, 0, 0), help_text='When should the lobby be opened, allowing participants to chat before the event?'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='plenary',
            name='end_date',
            field=models.DateTimeField(help_text='When will the event end?'),
        ),
        migrations.AlterField(
            model_name='plenary',
            name='live_participants',
            field=models.ManyToManyField(blank=True, related_name='plenaries_participating_live', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='plenary',
            name='start_date',
            field=models.DateTimeField(help_text='When will the event start?'),
        ),
    ]
