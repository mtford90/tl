from django.contrib import admin

# Register your models here.
from timezones.models import ToptalUser, Timezone


@admin.register(ToptalUser)
class ToptalUserAdmin(admin.ModelAdmin):
  list_display = (
    'username', 'email', 'first_name', 'last_name', 'is_staff')
  list_filter = ('is_staff', )
  order = ('-username', 'email')
  search_fields = ('username', 'first_name', 'last_name', 'email')


@admin.register(Timezone)
class TimezoneAdmin(admin.ModelAdmin):
  list_display = ('city', )
  list_filter = ('city', )
  search_fields = ('city', )
