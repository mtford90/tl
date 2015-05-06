import os
import dj_database_url

# noinspection PyUnresolvedReferences
from .settings import *


DEBUG = True
ALLOWED_HOSTS = ['*']

DATABASES['default'] = dj_database_url.config()
