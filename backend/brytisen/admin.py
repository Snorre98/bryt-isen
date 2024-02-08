from django.contrib import admin

from .models import Activity


class ActivityAdmin(admin.ModelAdmin):
    list_display = ('name', 'details', 'activity_type')

# Register your models here.


admin.site.register(Activity, ActivityAdmin)
