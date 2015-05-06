from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class ToptalUser(AbstractUser):
  class Meta:
    verbose_name_plural = 'Users'
    verbose_name = 'User'
