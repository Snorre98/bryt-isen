from __future__ import annotations

import logging
import itertools

from guardian.models import UserObjectPermission

from rest_framework import serializers

from django.contrib.auth import authenticate
from django.contrib.auth.models import Permission

from .models import User, Activity

logger = logging.getLogger(__name__)

"""
Serializers are classes that manage data. 
The data stored in the database might not be in the same format as the data that commes from API requests,
therefor serialziers make sure to format the data.

Data is serialized, which is the act of creating dataobjects (in our case JSON), when data is sendt to frontend.
Data is deserialized, which is the act of converting dataobjects into something readable 
in the programminglanguage/program(in our case Django), when data is sendt to the backend and further into the database.

In some framworks, like "Spring Boot", creating serializers can be more complex,
but with Django REST Framewework serialization and deserializaion can be done with one serialization class.

Serializers also authenticate and validata data.
https://www.django-rest-framework.org/api-guide/serializers/
"""


class ActivitySerializer(serializers.ModelSerializer):
    """
    ActivitySerializer serialises all
    fields in the activity model.
    """

    class Meta:
        model = Activity
        fields = '__all__'


##
## User and user-autentication related serializers
##
class LoginSerializer(serializers.Serializer):
    """
    Login serializer tied to LoginView
    Autenticates username and password
    Credit to: https://www.guguweb.com/2022/01/23/django-rest-framework-authentication-the-easy-way/
    This uses Django Rest Framework to autenticate
    """

    username = serializers.CharField(label='Username', write_only=True)
    password = serializers.CharField(
        label='Password',
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True,
    )

    # TIP: if you are experienced with Java, the keyword "this" is similar to the keyword "self" used here, in Python
    def validate(self, attrs: dict) -> dict:
        # Spesifying how to validata data in http request
        # The data in the http request is recived as a Python dict
        username = attrs.get('username')  # gets the value with the key 'username' in the Python dict
        password = attrs.get('password')

        if username and password:
            # username and password was defined -> authenticate the user with the default django.contrib.auth class
            user = authenticate(request=self.context.get('request'), username=username, password=password)
            if not user:
                # user was not defined -> throw error
                logger.error(f'Authentication failed for user: {username}')
                msg = f'user with username "{username}" not registered.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            # username and password was not defined -> throw error
            msg = 'Both username and password are required.'
            raise serializers.ValidationError(msg, code='authorization')

        # username and password was defined,
        # user was authenticated (the user provided correct username and password)
        # We have a valid user, put it in the serializer's validated_data dictionary
        # It will be used in the view.
        attrs['user'] = user
        # return the user object, providing it to the LoginView, which will send it to the frontend
        return attrs


class RegisterSerializer(serializers.Serializer):
    """
    Serializer for user registration.
    Serializes and validates registrationdata provided by the user.
    """

    # Defines registration data (here we could define more attributes, but for this project this is ok)
    username = serializers.CharField(label='Username', write_only=True)
    first_name = serializers.CharField(label='First Name', write_only=True)
    last_name = serializers.CharField(label='Last Name', write_only=True)
    password = serializers.CharField(
        label='Password',
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True,
    )

    def validate(self, attrs: dict) -> dict:
        # getts the values in the Python dictionery on keys:
        username = attrs.get('username')
        first_name = attrs.get('first_name')
        last_name = attrs.get('last_name')
        password = attrs.get('password')

        if username and password:
            # username and password is required and was provided.
            # creates user:
            user = User.objects.create_user(first_name=first_name, last_name=last_name, username=username, password=password)
            # authenticates the user that was created (unique user?)
            user = authenticate(request=self.context.get('request'), username=username, password=password)
            # if the user is authenticated the serializer does not throw an error and the user creation is finalized
        else:
            msg = 'Both "username" and "password" are required.'
            raise serializers.ValidationError(msg, code='authorization')
        # We have a valid user, put it in the serializer's validated_data dictionary
        # It will be used in the view.
        attrs['user'] = user
        return attrs


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for user data.
    Defines the permissions, what actions a user has access to
    related to manipulating data from frontend.
    This is a bit complex, but very scalable, as well as
    allows for object level permission and global level permission.
    """

    # TODO: decide if this should be expanded to work with groups of users

    # defining permissions as a methode we call "get_permissions". This is a  readonly field (from django rest framworkd SerializerMethodField class)
    permissions = serializers.SerializerMethodField(method_name='get_permissions', read_only=True)

    # defining objects permissions asa methdoe we call "get_object_permissions"
    object_permissions = serializers.SerializerMethodField(method_name='get_object_permissions', read_only=True)

    class Meta:
        model = User
        exclude = ['password', 'user_permissions']  # avoids exposing sensitive information to the API by excluding fields from serialization

    # the methode mentioned above
    # returns user permissions, provided in the user object as a list of strings
    def get_permissions(self, user: User) -> list[str]:
        # built-in django functiontion to extract permissions (from the class: django.contrib.auth)
        return user.get_all_permissions()

    @staticmethod
    def _permission_to_str(permission: Permission) -> str:
        # toString methode returning permission codename in django.contrib.auth
        return f'{permission.content_type.app_label}.{permission.codename}'

    def _obj_permission_to_obj(self, obj_perm: UserObjectPermission) -> dict[str, str]:
        # maps the object primary key to the permission level
        perm_obj = {
            'obj_pk': obj_perm.object_pk,
            'permission': self._permission_to_str(permission=obj_perm.permission),
        }
        return perm_obj  # more Django (guardian) permissions magic

    def get_object_permissions(self, user: User) -> list[dict[str, str]]:
        # getter for object permissions
        # filters a list of user-object permission relations to find the ones on current user
        user_object_perms_qs = UserObjectPermission.objects.filter(user=user)

        perm_objs = []
        for obj_perm in itertools.chain(user_object_perms_qs):
            # iterates over user_object_perms_qs list and adds object permissions
            perm_objs.append(self._obj_permission_to_obj(obj_perm=obj_perm))

        return perm_objs  # list of objects which user has permissions to manipulate
