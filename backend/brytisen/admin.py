from __future__ import annotations

from django.contrib import admin

from .models import User, Activity


class ActivityAdmin(admin.ModelAdmin):
    list_display = ('title', 'details', 'activity_type')


class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'first_name', 'last_name')


admin.site.register(Activity, ActivityAdmin)
admin.site.register(User, UserAdmin)
