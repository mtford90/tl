from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
from django.db.models import CharField


class ToptalUser(AbstractUser):
  class Meta:
    verbose_name_plural = 'Users'
    verbose_name = 'User'


class Timezone(models.Model):
  city = CharField(max_length=200, default='', blank=True)
