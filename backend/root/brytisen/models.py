from django.db import models

# Create your models here.


class Activity(models.Model):
    """
    This is a (data)model, it can be views as an object. 
    """
    activity_name = models.CharField(
        max_length=120)  # Aktivitet navn: f.eks. "Topptur"

    activity_details = models.TextField()  # Utdypende beskrivelse av aktivitet

    # TODO: add more fields for the Activity object
