# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('timezones', '0004_auto_20150509_1100'),
    ]

    operations = [
        migrations.AddField(
            model_name='timezone',
            name='name',
            field=models.CharField(max_length=200, default='', blank=True),
        ),
    ]
