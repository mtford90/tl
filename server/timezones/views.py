# Create your views here.


# ViewSets define the view behavior.
from django.template.response import TemplateResponse
from rest_framework import viewsets
from timezones.models import ToptalUser, Timezone
from timezones.serializers import UserSerializer, TimezoneSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.reverse import reverse


class UserViewSet(viewsets.ModelViewSet):
  queryset = ToptalUser.objects.all()
  serializer_class = UserSerializer


class TimezoneViewSet(viewsets.ModelViewSet):
  queryset = Timezone.objects.all()
  serializer_class = TimezoneSerializer
  permission_classes = (IsAuthenticated,)

  def get_queryset(self):
    user = self.request.user
    return self.queryset.filter(user=user)

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)


def index(request):
  response = TemplateResponse(request, 'index.html', {})
  return response




