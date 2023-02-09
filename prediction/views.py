from rest_framework.generics import ListCreateAPIView
from prediction.serializers import PredictionSerializer
from prediction.models import Prediction
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from server.settings import model



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
            predictions = model.predict([[age,sex,trestbps,chol,fbs,restecg,thalach,exang,oldpeak,ca]])
            if predictions[0] == 0:
                result = 'No Heart Disease'
            else:
                result = 'Heart Disease'
            print(self.request.user)
            serializer.save(user = self.request.user,target = result)
            return Response({'prediction': result})


@api_view(['GET'])
def prediction_result(request):
    posts = Prediction.objects.filter(user = request.user)
    serializer = PredictionSerializer(posts,many=True)
    return Response(serializer.data)