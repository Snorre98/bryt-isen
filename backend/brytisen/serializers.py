from rest_framework import serializers
from .models import Activity


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('activity_name', 'activity_description')
        #  TODO: add more fields to the model in models, then here
