from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import ChosenSongSerializer
from .models import ChosenSong
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
def main(request):
    return HttpResponse("Hello")

class ChosenSongView(APIView):
    #queryset = ChosenSong.objects.all();
    serializer_class = ChosenSongSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            youtube_url = serializer.data.url
    