from rest_framework.serializers import ModelSerializer
from prediction.models import Prediction

class PredictionSerializer(ModelSerializer):

    class Meta:
        model = Prediction
        exclude = ('user',)