from __future__ import annotations

from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils.translation import gettext as _
from django.contrib.auth.models import AbstractUser

from .utils.unique_file_upload import unique_file_upload


# Create your models here.


class Activity(models.Model):
    """
    Model for the activity object
    * title
    * details
    * activity_rules
    * activity_type
    * image_file
    * owner
    * isReported
    """

    title = models.CharField(max_length=40, null=True, blank=True)  # Aktivitet navn: f.eks. "Topptur"

    details = models.TextField(null=True, blank=True)  # Utdypende beskrivelse av aktivitet

    activity_rules = models.TextField(default='Default rules apply.', null=True, blank=True)

    activity_type = models.CharField(
        max_length=120,
        null=True,
        blank=True,
    )

    activity_image = models.ImageField(upload_to=unique_file_upload, null=True, blank=True)

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='user_activities',
        null=True,
        blank=True,
    )


class ReportedActivity(models.Model):
    """Model to track activities reported by users."""

    activity_id = models.ForeignKey(Activity, on_delete=models.CASCADE)
    reported_by_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='user_reported_activities',
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = 'Reported Activity'
        verbose_name_plural = 'Reported Activities'


class FavoritedActivity(models.Model):

    activity_id = models.ForeignKey(Activity, on_delete=models.CASCADE)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='user_favorites',
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = 'Reported Activity'
        verbose_name_plural = 'Reported Activities'


#
# User model
#
class User(AbstractUser):
    username = models.CharField(
        _('username'),
        max_length=50,
        unique=True,
        help_text=('Required. 50 chars or less.'),
        validators=[AbstractUser.username_validator],
        error_messages={
            'unique': _('Username exists.'),
        },
    )
    profile_gradient = models.CharField(null=False, blank=False, max_length=50,
                                        default="linear-gradient(262deg, #87d4f5, #3944df)")

    def has_perm(self, perm: str, obj: Model | None = None) -> bool:  # noqa: PLR0917, F821
        """
        Django magic for permissions.
        This defines that a user with global permissions,
        also has permissions to manipulate all objects.
        """
        has_global_perm = super().has_perm(perm=perm)
        has_object_perm = super().has_perm(perm=perm, obj=obj)
        return has_global_perm or has_object_perm

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_name='brytisen_user_set',
        related_query_name='brytisen_user',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name='brytisen_user_permission_set',
        related_query_name='brytisen_user_permission',
    )


class Review(models.Model):
    """
    Model for the review object
    * details
    * rating
    * activity
    * owner
    """

    details = models.TextField(max_length=40)  # Utdypende beskrivelse av aktivitet
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])  # Rating of the review
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name='review_activity')
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='review_owner',
        null=True,
        blank=True, )


class ReportedReview(models.Model):
    """Model to track reviews reported by users."""

    review_id = models.ForeignKey(Review, on_delete=models.CASCADE)
    reported_by_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='user_reported_reviews',
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = 'Reported Review'
        verbose_name_plural = 'Reported Reviews'
