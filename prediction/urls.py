from django.urls import path
from prediction.views import PredictionView,HomeView

urlpatterns = [
    path('',HomeView.as_view(),name='home'),
    path('predict/',PredictionView.as_view(),name='prediction'),
]