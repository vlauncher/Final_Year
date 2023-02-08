from django.urls import path
from prediction.views import PredictionView,prediction_result
from django.views.generic import TemplateView

urlpatterns = [
    path('predict/',PredictionView.as_view()),
    path('results/',prediction_result),
    path('',TemplateView.as_view(template_name = 'index.html'))
]