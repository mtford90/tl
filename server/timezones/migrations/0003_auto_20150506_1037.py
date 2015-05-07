# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('timezones', '0002_timezone'),
    ]

    operations = [
        migrations.RenameField(
            model_name='timezone',
            old_name='name',
            new_name='city',
        ),
    ]
