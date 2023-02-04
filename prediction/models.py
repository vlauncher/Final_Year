from django.db import models

# Create your models here.
class Prediction(models.Model):
    age = models.FloatField()
    sex = models.FloatField()
    trestbps = models.FloatField()
    chol = models.FloatField()
    fbs = models.FloatField()
    restecg = models.FloatField()
    thalach = models.FloatField()
    exang = models.FloatField()
    oldpeak = models.FloatField()
    ca = models.FloatField()
    target = models.CharField(max_length=30)

    