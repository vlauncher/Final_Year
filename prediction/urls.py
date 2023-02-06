from django.urls import path
from prediction.views import PredictionView,index

urlpatterns = [
    path('',index),
    path('predict/',PredictionView.as_view()),
]