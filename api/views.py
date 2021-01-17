from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import ChosenSongSerializer
from .models import ChosenSong
from rest_framework.views import APIView
from rest_framework.response import Response
import youtube_dl
from moviepy.editor import *

# Create your views here.
def main(request):
    return HttpResponse("Hello")

class ChosenSongView(APIView):
    #queryset = ChosenSong.objects.all();
    serializer_class = ChosenSongSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            youtube_url = serializer.data.get('url')
            youtube_title = serializer.data.get('title')
            ydl_opts = {'format':'mp4'}
            with youtube_dl.YoutubeDL(ydl_opts) as ydl:
                ydl.download(['https://www.youtube.com/watch?v=' + youtube_url])
                videoclip = VideoFileClip(youtube_title + '-' + youtube_url + '.mp4')
                audioclip = videoclip.audio
                audioclip.write_audiofile('mp3.mp3')
                audioclip.close()
                videoclip.close()