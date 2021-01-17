from django.urls import path
from .views import main, ChosenSongView

urlpatterns = [
    path('', main),
    path('test', ChosenSongView.as_view())
]