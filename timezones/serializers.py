# Serializers define the API representation.
from rest_framework import serializers
from timezones.models import ToptalUser, Timezone


class UserSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = ToptalUser
    fields = ('url', 'username', 'email', 'is_staff')


class TimezoneSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Timezone
