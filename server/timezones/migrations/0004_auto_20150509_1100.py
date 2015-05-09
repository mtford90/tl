# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('timezones', '0003_auto_20150506_1037'),
    ]

    operations = [
        migrations.RenameField(
            model_name='timezone',
            old_name='city',
            new_name='timezone',
        ),
        migrations.AddField(
            model_name='timezone',
            name='user',
            field=models.ForeignKey(related_name='timezones', to=settings.AUTH_USER_MODEL, default=''),
            preserve_default=False,
        ),
    ]
