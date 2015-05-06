import os
import dj_database_url

# noinspection PyUnresolvedReferences
from .settings import *


DEBUG = False
ALLOWED_HOSTS = ['*']

DATABASES['default'] = dj_database_url.config()
