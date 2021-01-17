import youtube_dl

ydl_opts = {'format':'mp4'}
with youtube_dl.YoutubeDL(ydl_opts) as ydl:
    ydl.download(['https://www.youtube.com/watch?v=HCjNJDNzw8Y&ab_channel=CamilaCabelloVEVO'])

from moviepy.editor import *

videoclip = VideoFileClip('Camila Cabello - Havana (Audio) ft. Young Thug-HCjNJDNzw8Y.mp4')
audioclip = videoclip.audio
audioclip.write_audiofile('mp3.mp3')
audioclip.close()
videoclip.close()