from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import ChosenSongSerializer
from .models import ChosenSong
from rest_framework.views import APIView
from rest_framework.response import Response
import youtube_dl
from moviepy.editor import *
from spleeter.separator import Separator
import crepe
import crepe
from scipy.io import wavfile
import pandas as pd
from math import log2, pow
import audioread
import wave

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

                separator = Separator('spleeter:2stems')
                prediction = separator.separate_to_file('mp3.mp3', 'frontend/static/frontend/src/Output')
                return HttpResponse('Song Uploaded Successfully!')

class RecordVocalsView(APIView):
    def post(self, request, format=None):
        f = open('./frontend/static/frontend/src/userVocals.wav', 'wb')
        f.write(request.body)
        f.close()
        return HttpResponse('Audio Received and Converted to WAV')

class VocalAnalysisView(APIView):
    def get(self, request, format=None):
        def frequency_of_song_artist(file_name):
            sr, audio = wavfile.read(file_name)
            time, frequency, confidence, activation = crepe.predict(audio, sr,viterbi=True, step_size=50)
            return frequency, list(time)

        def frequency_of_singer(file_name):
            sr, audio = wavfile.read(file_name)
            time, frequency, confidence, activation = crepe.predict(audio, sr,viterbi=True, step_size=50)
            return frequency, list(time)

        def pitch(freq):
            h = round(12*log2(freq/C0))
            octave = h // 12
            n = h % 12
            return name[n] + str(octave)

        def get_labels(frequency):
            label_frequency = []
            for i in frequency:
                if i == 0:
                    label_frequency.append('None')
                else:
                    label_frequency.append(pitch(i))
            return label_frequency
        
        listt = []
        with audioread.audio_open('frontend/static/frontend/src/userVocals.wav') as f:
            print(f.channels, f.samplerate, f.duration)
            for i in f:
                listt.append(i)

        wf = wave.open('frontend/static/frontend/src/userVocalsNew.wav', 'wb')
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(48000)
        wf.writeframes(b''.join(listt))
        wf.close()

        singer_frequency, time_singer = frequency_of_singer('frontend/static/frontend/src/userVocalsNew.wav')
        artist_frequency, time_artist = frequency_of_song_artist('frontend/static/frontend/src/Output/mp3/vocals.wav')
        artist_frequency = list(artist_frequency)
        singer_frequency = list(singer_frequency)

        if len(time_artist) >= len(time_singer):
            time = time_singer
            score = len(time_artist) - len(time_singer)
            for i in range(score):
                artist_frequency.pop()
        else:
            time = time_artist
            score = len(time_singer) - len(time_artist)
            for i in range(score):
                singer_frequency.pop()
        
        A4 = 440
        C0 = A4*pow(2, -4.75)
        name = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

        artist_label_frequencies = get_labels(artist_frequency)
        singer_label_frequencies = get_labels(singer_frequency)
        difference = []

        for i in range(len(time)):
            difference.append(artist_frequency[i]-singer_frequency[i])

        significant = []
        for i in range(len(difference)):
            if abs(difference[i]) > 100:
                significant.append('Yes')
            else:
                significant.append('No')

        df = {'Time': time,'Artist Notes': artist_label_frequencies, 'Singer Notes': singer_label_frequencies, 'Difference in frequency': difference, 'Significant Difference': significant}

        df = pd.DataFrame(df)

        df.to_csv('frontend/static/frontend/src/spreadsheets/music_analysis.csv')
    

