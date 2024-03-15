from __future__ import annotations

from django.contrib import admin

from .models import User, Activity, Review, ReportedActivity, FavoritedActivity


class ActivityAdmin(admin.ModelAdmin):
    list_display = ('title', 'details', 'activity_type')


class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'first_name', 'last_name')

class ReviewAdmin(admin.ModelAdmin):
    list_display = ('owner', 'rating', 'details')


class ReportedActivityAdmin(admin.ModelAdmin):
    list_display = ('activity_id',)

class ReportedReviewAdmin(admin.ModelAdmin):
    list_display = ('review_id',)

class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('activity_id', "owner")


admin.site.register(Activity, ActivityAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(ReportedActivity, ReportedActivityAdmin)
admin.site.register(FavoritedActivity, FavoriteAdmin)
