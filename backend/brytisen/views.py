from __future__ import annotations

from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, BasePermission, IsAuthenticated, DjangoModelPermissionsOrAnonReadOnly

from django.contrib.auth import login, logout
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie

from .models import User, Activity
from .serializers import UserSerializer, LoginSerializer, ActivitySerializer, RegisterSerializer

"""
    Views are what we interact with from frontend to get data from the database.
    Some of them will look simple(like ActivityView), but this is because there is some complexity going on in the background,
    managed by Django ? Django REST Framework.
    When specified (like in the ActivityView, by the argument "viewsets.ModelViewSet") Django will create a set of queries
    for the data the view relates to.
    Read more here: https://www.django-rest-framework.org/api-guide/viewsets/

    In some cases we must specify what should happen when a request for an entry in the DB is recived. See comments in LogiView.

    Some views are tied to models we create (throug the serializer for the view), but some views are provided by Django default models,
    like login, logout, register and csrf.
"""


class ActivityView(viewsets.ModelViewSet):
    """
    View to access activity data.
    Can be accessed by anyone from localhost:3000
    """

    permission_classes = permission_classes = [IsAuthenticated]
    serializer_class = ActivitySerializer
    queryset = Activity.objects.all()


@method_decorator(ensure_csrf_cookie, 'dispatch')
class CsrfView(APIView):
    """
    This view provides a CSRF token to the user.
    The @methode_decorator specifies that one must have a CSRF token to access the view.
    More on CSRF tokens here: https://en.wikipedia.org/wiki/Cross-site_request_forgery
        -> In retrospect using CSRF tokens for this project might be overkill, but now it is setup and can be used.
    """

    permission_classes: list[type[BasePermission]] = [AllowAny]

    def get(self, request: Request) -> Response:
        csrf_token = get_token(request=request)
        return Response(data=csrf_token, headers={'X-CSRFToken': csrf_token})


@method_decorator(csrf_protect, 'dispatch')
class LoginView(APIView):
    """
    This view handles login requests.
    It can be accessed by anyone, as in: non-authenticated users.
    """

    permission_classes = [AllowAny]  # Defines permission level for this view
    # Defines what happens when a POST request commes at this view

    def post(self, request: Request) -> Response:
        # Attempts to serialize login request (validate and parse request data)"
        serializer = LoginSerializer(data=self.request.data, context={'request': self.request})
        # Checks if serialization was valid, if it was the user is established.
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']  # Establishes current user

        # Exectues login of established user
        login(request=request, user=user, backend='django.contrib.auth.backends.ModelBackend')
        new_csrf_token = get_token(request=request)

        # Creates http response to login, and gives new CSRF token (Django wants a new one after executing login actions)
        response = Response(
            status=status.HTTP_202_ACCEPTED,
            data=new_csrf_token,
            headers={'X-CSRFToken': new_csrf_token},
        )

        return response


@method_decorator(csrf_protect, 'dispatch')
class LogoutView(APIView):
    """
    This view allows for loging out.
    A user must be authenitcated (loged in) to access the LogoutView.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request: Request) -> Response:
        # Defines what to do when a POST request commes in on this view
        if not request.user.is_authenticated:
            # User is not autorized'
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            logout(request)
            response = Response(status=status.HTTP_200_OK)

        return response


@method_decorator(csrf_protect, 'dispatch')
class RegisterView(APIView):
    """
    View for user registration.

    This view handles user registration requests. It uses the RegisterSerializer
    to validate the user data and creates a new user if validation succeeds.
    Upon successful registration, the user is automatically logged in and
    a new CSRF token is generated and returned in the response.
    """

    permission_classes = [AllowAny]

    def post(self, request: Request) -> Response:
        # Attempts to regiser user:
        serializer = RegisterSerializer(data=self.request.data, context={'request': self.request})
        # validates if user could be registred (does user exisit):
        serializer.is_valid(raise_exception=True)
        # Attempts to set current user:
        user = serializer.validated_data['user']
        # Checks for user, then executes login:
        if user:
            login(request=request, user=user, backend='django.contrib.auth.backends.ModelBackend')
            new_csrf_token = get_token(request=request)
            # Returns http status and new csrf token, as Django wants a new one after executing login actions
            return Response(
                status=status.HTTP_202_ACCEPTED,
                data=new_csrf_token,
                headers={'X-CSRFToken': new_csrf_token},
            )

        else:
            # Handles case where user was not set correctly
            return Response(
                status=status.HTTP_204_NO_CONTENT,
            )


class UserView(APIView):
    """
    This view provides access to user realted data.
    Autenticated users can accsess this view.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        current_user = UserSerializer(request.user, many=False).data
        # returns the user data of the current request (the one currently autenticated)
        return Response(data=current_user)


class AllUsersView(ListAPIView):
    """
    View that allows for accessing a list of all users.
    Can be accessed by a custom permission class, similar to
    DjangoModelPermissions, except that anonymous users are
    allowed read-only access.
    http://localhost:8000/api/users/
    """

    permission_classes = (DjangoModelPermissionsOrAnonReadOnly,)
    serializer_class = UserSerializer
    queryset = User.objects.all()
