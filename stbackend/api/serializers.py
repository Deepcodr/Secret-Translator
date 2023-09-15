# from sqlite3 import Cursor
# from django.forms import fields
from django.forms import fields
from rest_framework import serializers
from .models import User,File

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['id','userName','password']

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model=File
        fields=['id','inputLang','outputLang','audioFile']