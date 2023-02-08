from django.urls import path
from prediction.views import PredictionView,prediction_result

urlpatterns = [
    path('predict/',PredictionView.as_view()),
    path('results/',prediction_result),
]