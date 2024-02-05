from django.contrib import admin
from .models import Activity


class ActivityAdmin(admin.ModelAdmin):
    list_display = ('activity_name', 'activity_details')
    #  TODO: add more fields to the model in models, then here

# Register your models here.


admin.site.register(Activity, ActivityAdmin)
