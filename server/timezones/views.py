# Create your views here.


# ViewSets define the view behavior.
from django.template.response import TemplateResponse
from rest_framework import viewsets
from timezones.models import ToptalUser, Timezone
from timezones.serializers import UserSerializer, TimezoneSerializer
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated


class UserViewSet(viewsets.ModelViewSet):
  queryset = ToptalUser.objects.all()
  serializer_class = UserSerializer


class TimezoneViewSet(viewsets.ModelViewSet):
  queryset = Timezone.objects.all()
  serializer_class = TimezoneSerializer
  permission_classes = (IsAuthenticated,)
  filter_backends = (SearchFilter,)
  search_fields = ('timezone', 'name')

  def get_queryset(self):
    user = self.request.user
    if not user.is_anonymous():
      qs = self.queryset.filter(user=user)
      print(qs)
      return qs
    return self.queryset

  def perform_create(self, serializer):
    user = self.request.user
    if user:
      serializer.save(user=user)
    else:
      serializer.save()

  def perform_update(self, serializer):
    serializer.save()



def index(request):
  response = TemplateResponse(request, 'index.html', {})
  return response




