from django.db import models

# Create your models here.
class ChosenSong(models.Model):
    url = models.CharField(max_length=50,  default="")
