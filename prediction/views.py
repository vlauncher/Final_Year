from rest_framework.generics import CreateAPIView
from prediction.serializers import PredictionSerializer
from prediction.models import Prediction
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from server.settings import model
from django.http import FileResponse
from reportlab.pdfgen import canvas


class PredictionView(CreateAPIView):
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
            serializer.save(owner = self.request.user,target = result)
            return Response({'prediction': result})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def prediction_result(request):
    posts = Prediction.objects.filter(owner=request.user)
    serializer = PredictionSerializer(posts,many=True)
    return Response(serializer.data)


import io

def generate_pdf(predictions):
    buffer = io.BytesIO()
    pdf = canvas.Canvas(buffer,pagesize='A4')
    pdf.setFont('Helvetica',16)
    pdf.drawString(100,800,"Heart disease predictions")
    y = 750
    for pred in predictions:
        pdf.drawString(100,y, str(pred.age))
        pdf.drawString(200,y, str(pred.sex))
        pdf.drawString(250,y, str(pred.trestbps))
        pdf.drawString(300,y, str(pred.chol))
        pdf.drawString(400,y, str(pred.fbs))
        pdf.drawString(500,y, str(pred.restecg))
        pdf.drawString(550,y, str(pred.thalach))
        pdf.drawString(650,y, str(pred.exang))
        pdf.drawString(750,y, str(pred.oldpeak))
        pdf.drawString(800,y, str(pred.ca))
        pdf.drawString(900,y, str(pred.prediction))
    pdf.save()
    buffer.seek(0)
    return buffer

def print_pdf_predictions(request):
    predictions = Prediction.objects.all()
    pdf = generate_pdf(predictions)
    response = FileResponse(pdf,content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="predictions.pdf"'
