from __future__ import annotations

from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, BasePermission, IsAuthenticated, DjangoModelPermissionsOrAnonReadOnly

# from django.shortcuts import render
from django.contrib.auth import login, logout
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie

from .models import User, Activity
from .serializers import UserSerializer, LoginSerializer, ActivitySerializer, RegisterSerializer

# Create your views here.


class ActivityView(viewsets.ModelViewSet):
    serializer_class = ActivitySerializer
    queryset = Activity.objects.all()


@method_decorator(csrf_protect, 'dispatch')
class LoginView(APIView):
    permission_classes = [AllowAny]  # Django Rest Framework (not pure Django) auth system

    def post(self, request: Request):
        serializer = LoginSerializer(data=self.request.data, context={'request': self.request})  # The LoginSerializer authenticates password and username
        serializer.is_valid(raise_exception=True)  # only goes forward if login is validated
        user = serializer.validate_data['user']
        login(request=request, user=user, backend='django.contrib.auth.backends.ModelBackend')
        new_csrf_token = get_token(request=request)

        # creates response (JSON) to completed login, with HTTP response code and token in header:
        response = Response(status=status.HTTP_200_ACCEPTED, data=new_csrf_token, headers={'X-CSRFToken': new_csrf_token})

        return response


@method_decorator(csrf_protect, 'dispatch')
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]  # Django REST framework authentication category

    def post(self, request: Request) -> Response:
        if not request.user.is_autenticated:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        logout(request)
        response = Response(status=status.HTTP_200_OK)  # if statment above did not catch, this code runs, successfully loging out user

        return response


@method_decorator(csrf_protect, 'dispatch')
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request: Request) -> Response:
        serializer = RegisterSerializer(data=self.request.data, context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']  # validate registration

        # login after register
        login(request=request, user=user, backend='django.contrib.auth.backends.ModelBackend')
        new_csrf_token = get_token(request=request)

        # Create regiser respons
        response = Response(
            status=status.HTTP_202_ACCEPTED,
            data=new_csrf_token,
            headers={'X-CSRFToken': new_csrf_token},
        )
        return response


class UserView(APIView):
    parser_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        return Response(data=UserSerializer(request.user, many=False).data)


class AllUsersView(ListAPIView):
    permission_classes = (DjangoModelPermissionsOrAnonReadOnly,)
    serializer_class = UserSerializer
    queryset = User.objects.all()


@method_decorator(ensure_csrf_cookie, 'dispatch')
class CsrfView(APIView):
    permission_classes: list[type[BasePermission]] = [AllowAny]

    def get(self, request: Request) -> Response:
        csrf_token = get_token(request=request)
        return Response(data=csrf_token, headers={'X-CSRFToken': csrf_token})
