from rest_framework.generics import ListCreateAPIView
from prediction.serializers import PredictionSerializer
from prediction.models import Prediction
from rest_framework.response import Response
from server.settings import model
from django.shortcuts import render

def index(request):
    return render(request,template_name='index.html')


class PredictionView(ListCreateAPIView):
    serializer_class = PredictionSerializer
    queryset = Prediction.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            age = serializer.validated_data.get('age')
            sex = serializer.validated_data.get('sex')
            trestbps = serializer.validated_data.get('trestbps')
            chol = serializer.validated_data.get('chol')
            fbs = serializer.validated_data.get('fbs')
            restecg = serializer.validated_data.get('restecg')
            thalach = serializer.validated_data.get('thalach')
            exang = serializer.validated_data.get('exang')
            oldpeak	= serializer.validated_data.get('oldpeak')
            ca = serializer.validated_data.get('ca')
            print(self.request.data)
            predictions = model.predict([[age,sex,trestbps,chol,fbs,restecg,thalach,exang,oldpeak,ca]])
            if predictions[0] == 0:
                result = 'No Heart Disease'
            else:
                result = 'Heart Disease'
            serializer.save(target = result)
            return Response({'prediction': result})
