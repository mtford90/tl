# Create your views here.


# ViewSets define the view behavior.
from rest_framework import viewsets
from timezones.models import ToptalUser, Timezone
from timezones.serializers import UserSerializer, TimezoneSerializer


class UserViewSet(viewsets.ModelViewSet):
  queryset = ToptalUser.objects.all()
  serializer_class = UserSerializer


class TimezoneViewSet(viewsets.ModelViewSet):
  queryset = Timezone.objects.all()
  serializer_class = TimezoneSerializer
