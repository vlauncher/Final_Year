from django.urls import path
from prediction.views import PredictionView,index

urlpatterns = [
    path('',index,name='home'),
    path('predict/',PredictionView.as_view(),name='prediction'),
]