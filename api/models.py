from django.db import models

# Create your models here.
class ChosenSong(models.Model):
    url = models.CharField(max_length=50,  default="")
    title = models.CharField(max_length=100, default="")

# class RecordVocals(models.Model):
#     blob = models.FileField()
#     title = models.CharField(max_length=100, default="")
