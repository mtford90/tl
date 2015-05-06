
# Create your views here.


# ViewSets define the view behavior.
from rest_framework import viewsets
from timezones.models import ToptalUser
from timezones.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = ToptalUser.objects.all()
    serializer_class = UserSerializer
