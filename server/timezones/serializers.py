# Serializers define the API representation.
from rest_framework import serializers
from timezones.models import ToptalUser, Timezone
from rest_framework.fields import Field, IntegerField


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = ToptalUser
    fields = ('url', 'username', 'email', 'is_staff')


class TimezoneSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  class Meta:
    model = Timezone
