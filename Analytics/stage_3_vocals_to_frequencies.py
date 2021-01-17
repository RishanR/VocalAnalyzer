import crepe
import crepe
from scipy.io import wavfile

def frequency_of_song_artist(file_name):
    sr, audio = wavfile.read(file_name)
    time, frequency, confidence, activation = crepe.predict(audio, sr,viterbi=True, step_size=50)
    return frequency, list(time)

def frequency_of_singer(file_name):
    sr, audio = wavfile.read(file_name)
    time, frequency, confidence, activation = crepe.predict(audio, sr,viterbi=True, step_size=50)
    return frequency, list(time)


artist_frequency, time_artist = frequency_of_song_artist('frontend/static/frontend/src/Output/mp3/vocals.wav')
singer_frequency, time_singer = frequency_of_singer('frontend/static/frontend/src/userVocals.wav')
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

import pandas as pd
from math import log2, pow

A4 = 440
C0 = A4*pow(2, -4.75)
name = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    
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

df.to_csv('/frontend/static/frontend/src/spreadsheets/music_analysis.csv')
