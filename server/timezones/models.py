from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
from django.db.models import CharField, ForeignKey


class ToptalUser(AbstractUser):
  """
  A user
  """
  class Meta:
    verbose_name_plural = 'Users'
    verbose_name = 'User'


class Timezone(models.Model):
  timezone = CharField(max_length=200, default='', blank=True)
  user = ForeignKey('ToptalUser', related_name='timezones')
