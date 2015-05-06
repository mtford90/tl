# Serializers define the API representation.
from rest_framework import serializers
from timezones.models import ToptalUser


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ToptalUser
        fields = ('url', 'username', 'email', 'is_staff')
