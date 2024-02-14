from __future__ import annotations

import itertools

from guardian.models import UserObjectPermission

from rest_framework import serializers

from django.contrib.auth import authenticate
from django.contrib.auth.models import Permission

from .models import User, Activity


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        # fields = ('name', 'activity_description')
        #  TODO: add more fields to the model in models, then here
        fields = '__all__'


##
## User and user-autentication related serializers
##
class LoginSerializer(serializers.Serializer):
    """
    Autenticates username and password
    Credit to: https://www.guguweb.com/2022/01/23/django-rest-framework-authentication-the-easy-way/
    This uses Django Rest Framework to autenticate
    """

    username = serializers.CharField(label='Username', write_only=True)
    password = serializers.CharField(
        label='Password',
        ## Showing
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True,
    )

    """
    selfe: the instance of the object, like "this"
    responseAttributes: a JSON object containing data from a HTTP request
        JSON can be parsed as a dict in Python    
    """

    def validate(self, responseAttributes: dict) -> dict:
        username = responseAttributes.get('username')
        password = responseAttributes.get('password')

        if username and password:
            user = authenticate(request=self.context.get('request'), username=username, password=password)  # Django auth magic
            if not user:
                msg = 'user not registered.'
                raise serializers.ValidationError(msg, code='autorization')
            else:
                msg = 'Both username and password are required.'
                raise serializers.ValidationError(msg, code='authorization')
            responseAttributes['user'] = user
            return responseAttributes


class RegisterSerializer(serializers.Serializer):
    """
    Serializer for user registration.
    """

    username = serializers.CharField(label='Username', write_only=True)
    first_name = serializers.CharField(label='First Name', write_only=True)
    last_name = serializers.CharField(label='Last Name', write_only=True)
    password = serializers.CharField(
        label='Password',
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True,
    )

    def validate(self, data):
        """Validates and creates a new user."""

        username = data.get('username')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        password = data.get('password')

        if not (username and password):
            raise serializers.ValidationError('Username and password are required.')

        # Attempt to create a new user
        try:
            user = User.objects.create_user(username=username, first_name=first_name, last_name=last_name, password=password)
        except Exception as e:
            raise serializers.ValidationError(f'Error creating user: {str(e)}')

        data['user'] = user
        return data


class UserSerializer(serializers.ModelSerializer):
    # TODO: Create get_permissions, get_object_permissions
    permissions = serializers.SerializerMethodField(method_name='get_permissions', read_only=True)
    object_permissions = serializers.SerializerMethodField(method_name='get_object_permissions', read_only=True)

    class Meta:
        model = User
        exclude = ['password', 'user_permissions']  # does not serialise these fields

    def get_permissions(self, user: User) -> list[str]:
        return user.get_all_permissions()  # Django permissions magic

    @staticmethod
    def _permission_to_str(permission: Permission) -> str:
        return f'{permission.content_type.app_label}.{permission.codename}'  # Django permissions magic

    def _obj_permission_to_obj(self, obj_perm: UserObjectPermission) -> dict[str, str]:
        perm_obj = {
            'obj_ok': obj_perm.object_pk,
            'permission': self._permission_to_str(permission=obj_perm.permission),
        }
        return perm_obj  # more Django (guardian) permissions magic

    def get_object_permissions(self, user: User) -> list[dict[str, str]]:
        user_object_perms_qs = UserObjectPermission.object.filter(user=user)  #  findes appropriat perms

        perm_objs = []
        for obj_perm in itertools.chain(user_object_perms_qs):
            perm_objs.append(self._obj_permission_to_obj(obj_perm=obj_perm))

        return perm_objs  # list of objects which user has permissions to manipulate
