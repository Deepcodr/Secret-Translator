from django.contrib import admin
from .models import User,File
from rest_framework import serializers


# Register your models here.
@admin.register(User)
class studentAdmin(admin.ModelAdmin):
    list_display=['id','userName','password']

