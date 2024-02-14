from __future__ import annotations

from django.db import models
from django.conf import settings

# Create your models here.


class Activity(models.Model):
    """This is a (data)model, it can be views as an object."""
    # TODO: id
    name = models.CharField(
        max_length=120)  # Aktivitet navn: f.eks. "Topptur"

    details = models.TextField()  # Utdypende beskrivelse av aktivitet

    activity_rules = models.TextField(default="Default rules apply.")

    # TODO: consider adding image field

    UNDEFINED = "UNDEFINED"
    TRENING = "TRENING"
    FYLLA = "FYLLA"
    VERV = "VERV"
    TOPPTUR = "TOPPTUR"

    TYPE_CHOICES = [
        # TODO: make serius 
        (UNDEFINED, 'Undefined'),
        (TRENING, 'Trening'),
        (FYLLA, 'Fylla'),
        (VERV, 'Verv'),
        (TOPPTUR, 'Topptur'),
    ]

    # TODO: multiple choice form
    # TODO: find out how Django forms work, and how to implement this.

    activity_type = models.CharField(
        max_length=120,
        choices=TYPE_CHOICES,
        default=UNDEFINED,
   ) # TEMPORARY: this is now drop-down, will become multiple choice form

    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete = models.CASCADE,
                              related_name='activites',
                              null = True, #  Temporarily allow null
                              )
    isReported = models.BooleanField(null = True)
    
    thumbnail = models.FileField(upload_to='thumbnails/', null=True, blank=True)    


# TODO: add review class
