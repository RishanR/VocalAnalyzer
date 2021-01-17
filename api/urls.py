from django.urls import path
from .views import main, ChosenSongView, RecordVocalsView, VocalAnalysisView

urlpatterns = [
    path('', main),
    path('choosesong', ChosenSongView.as_view()),
    path('recordvocals', RecordVocalsView.as_view()),
    path('vocalanalysis', VocalAnalysisView.as_view())
]