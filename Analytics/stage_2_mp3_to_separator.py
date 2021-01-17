from spleeter.separator import Separator

separator = Separator('spleeter:2stems')

prediction = separator.separate_to_file('my_first_audio_file_2.wav', 'Output')
