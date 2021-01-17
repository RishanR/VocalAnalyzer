import audioread
import wave

listt = []
with audioread.audio_open('userVocals.wav') as f:
    print(f.channels, f.samplerate, f.duration)
    for i in f:
        listt.append(i)

wf = wave.open('final_test.wav', 'wb')
wf.setnchannels(2)
wf.setsampwidth(2)
wf.setframerate(48000)
wf.writeframes(b''.join(listt))
wf.close()
