from django.db import models

# Create your models here.
class User(models.Model):
    userName=models.CharField(max_length=10)
    password=models.CharField(max_length=10) 

class File(models.Model):
    inputLang=models.CharField(max_length=20)
    outputLang=models.CharField(max_length=20)
    audioFile=models.FileField(upload_to='audio',blank=True)
    