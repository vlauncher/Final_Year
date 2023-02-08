from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class Prediction(models.Model):
    owner = models.ForeignKey(User,on_delete=models.CASCADE,related_name='owner')
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
    target = models.CharField(max_length=30,blank=True)
    