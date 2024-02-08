from __future__ import annotations

from rest_framework import viewsets

from django.shortcuts import render

from .models import Activity
from .serializers import ActivitySerializer

# Create your views here.


class ActivityView(viewsets.ModelViewSet):
    serializer_class = ActivitySerializer
    queryset = Activity.objects.all()
