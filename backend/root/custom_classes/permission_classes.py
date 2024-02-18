from __future__ import annotations

from typing import TYPE_CHECKING, Any

from rest_framework.permissions import BasePermission, DjangoObjectPermissions

if TYPE_CHECKING:
    from rest_framework.views import APIView
    from rest_framework.request import Request

    from django.db.models import Model, QuerySet

    from brytisen.models import User


"""
Credit: https://github.com/Samfundet/Samfundet4/blob/688-add-custom-attachments-to-application-2/backend/root/custom_classes/permission_classes.py
"""


class SuperUserPermission(BasePermission):
    "Checks if a request has permission"

    def has_permission(self, request: Request, view: APIView) -> bool:  # noqa: PLR0917
        "Extends BasePermission Django class, for superupser"
        user: User = request.user  # gets the user in the request
        return user.is_active and user.is_superuser  #  checks if user is active and is superuser

    def has_object_permission(self, request: Request, view: APIView, obj: Any) -> bool:  # noqa: PLR0917
        "Methode for checking object-level permissions (ex. permission to delete activity post)"
        return self.has_permission(request=request, view=view)  # Reuses `has_permission` for object-level checks.


class CustomDjangoObjectPermissions(DjangoObjectPermissions):
    """Add django permissions to read methode"""

    # Mapping HTTP methods to corresponding Django model permissions.
    perms_map = {
        'GET': ['%(app_label)s.view_%(model_name)s'],
        'OPTIONS': [],
        'HEAD': [],
        'POST': ['%(app_label)s.add_%(model_name)s'],
        'PUT': ['%(app_label)s.change_%(model_name)s'],
        'PATCH': ['%(app_label)s.change_%(model_name)s'],
        'DELETE': ['%(app_label)s.delete_%(model_name)s'],
    }

    def has_permission(self, request: Request, view: APIView) -> bool:  # noqa: F811, PLR0917
        "Adds custom logic to has_permission"
        queryset: QuerySet = self._queryset(view)  # getting queryset from instance of the view (each view has a set of queries "behind the scenes")
        model_cls: Model = queryset.model  # getts the model class from the queryset
        user: User = request.user  # gets the user from the request(in arg)

        if not user.is_authenticated:  # is the user authenticated?
            return False

        if request.method == 'POST':
            '# Fetching permissions required for POST requests some (vilkårlig) model.'
            post_perms: list[str] = self.get_required_permissions(method='POST', model_cls=model_cls)
            has_perm = user.has_perm(perm_list=post_perms)  # Checking if the user has the required permissions.
            return has_perm  # return boolean dependent on user perms
        return True  # Default to True if not a POST request or if authenticated and no specific permissions required.
