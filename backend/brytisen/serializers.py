from __future__ import annotations

from rest_framework import serializers

from .models import Activity


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        #fields = ('name', 'activity_description')
        #  TODO: add more fields to the model in models, then here
        fields = '__all__'
