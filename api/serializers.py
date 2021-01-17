from rest_framework import serializers
from .models import ChosenSong

class ChosenSongSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChosenSong
        fields = ('url',);
