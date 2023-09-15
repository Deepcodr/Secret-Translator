


from django.http import HttpResponse, request
from playsound import playsound
import speech_recognition as sr
from googletrans import Translator
from gtts import gTTS
from pydub import AudioSegment
import ffmpeg
import os
flag = 0
import io
from fuzzywuzzy import process


dic = ('afrikaans', 'af', 'albanian', 'sq',
    'amharic', 'am', 'arabic', 'ar',
    'armenian', 'hy', 'azerbaijani', 'az',
    'basque', 'eu', 'belarusian', 'be',
    'bengali', 'bn', 'bosnian', 'bs', 'bulgarian',
    'bg', 'catalan', 'ca', 'cebuano',
    'ceb', 'chichewa', 'ny', 'chinese (simplified)',
    'zh-cn', 'chinese (traditional)',
    'zh-tw', 'corsican', 'co', 'croatian', 'hr',
    'czech', 'cs', 'danish', 'da', 'dutch',
    'nl', 'english', 'en', 'esperanto', 'eo',
    'estonian', 'et', 'filipino', 'tl', 'finnish',
    'fi', 'french', 'fr', 'frisian', 'fy', 'galician',
    'gl', 'georgian', 'ka', 'german',
    'de', 'greek', 'el', 'gujarati', 'gu',
    'haitian creole', 'ht', 'hausa', 'ha',
    'hawaiian', 'haw', 'hebrew', 'he', 'hindi',
    'hi', 'hmong', 'hmn', 'hungarian',
    'hu', 'icelandic', 'is', 'igbo', 'ig', 'indonesian',
    'id', 'irish', 'ga', 'italian',
    'it', 'japanese', 'ja', 'javanese', 'jw',
    'kannada', 'kn', 'kazakh', 'kk', 'khmer',
    'km', 'korean', 'ko', 'kurdish (kurmanji)',
    'ku', 'kyrgyz', 'ky', 'lao', 'lo',
    'latin', 'la', 'latvian', 'lv', 'lithuanian',
    'lt', 'luxembourgish', 'lb',
    'macedonian', 'mk', 'malagasy', 'mg', 'malay',
    'ms', 'malayalam', 'ml', 'maltese',
    'mt', 'maori', 'mi', 'marathi', 'mr', 'mongolian',
    'mn', 'myanmar (burmese)', 'my',
    'nepali', 'ne', 'norwegian', 'no', 'odia', 'or',
    'pashto', 'ps', 'persian', 'fa',
    'polish', 'pl', 'portuguese', 'pt', 'punjabi',
    'pa', 'romanian', 'ro', 'russian',
    'ru', 'samoan', 'sm', 'scots gaelic', 'gd',
    'serbian', 'sr', 'sesotho', 'st',
    'shona', 'sn', 'sindhi', 'sd', 'sinhala', 'si',
    'slovak', 'sk', 'slovenian', 'sl',
    'somali', 'so', 'spanish', 'es', 'sundanese',
    'su', 'swahili', 'sw', 'swedish',
    'sv', 'tajik', 'tg', 'tamil', 'ta', 'telugu',
    'te', 'thai', 'th', 'turkish',
    'tr', 'ukrainian', 'uk', 'urdu', 'ur', 'uyghur',
    'ug', 'uzbek', 'uz',
    'vietnamese', 'vi', 'welsh', 'cy', 'xhosa', 'xh',
    'yiddish', 'yi', 'yoruba',
    'yo', 'zulu', 'zu')

############ API ##################
from django.http import HttpResponse, request

from api import serializers
from rest_framework.response import Response
from api.models import User,File
from api.serializers import UserSerializer,FileSerializer
from rest_framework.views import APIView
from rest_framework import status
from django.db import connection 
from django.conf import settings
from pathlib import Path
from django.views.decorators.csrf import csrf_exempt

#raw sql



#begin from here need to get file from path by using file_path var
class UserView(APIView):
    def post(self,request,format=None):
        data=request.data
        username=data['userName']
        password=data['password']

        serializer = UserSerializer(data=request.data)
        print("post hitted")
        if serializer.is_valid():
            # serializer.save()
            userdata=User.objects.filter(userName=username,password=password).values()
            if(userdata):
                #setting session
                #setSession(self     ,username)
                return Response({'msg':'success'})
                

            else:
                return Response({'msg':'failed'})

            ''' ----------------------------------------------don't remove ------------------------------------
            akash=userdata[0].values()
            print("values=",akash)
            
            a=list(akash)
            # print(a)
            dbusername=a[1]
            dbpass=a[2]
            if dbusername== username and dbpass == password:
                print(dbusername,dbpass)
'''
            # return Response({'msg':'Success msg from backend','ststus':'success','user':serializer.data},status=status.HTTP_201_CREATED)
            
           
        print(serializer)
        
        return Response(serializer.errors)

    def get(self,request,format=None):
        user=User.objects.all()
        serializer = UserSerializer(user,many=True)
        return Response({'msg':'Success get ','ststus':'success','user':serializer.data},status=status.HTTP_200_OK) 


class FileView(APIView):
    def audiototext(self,src_lang,to_lang,file_path):
        r = sr.Recognizer()
        src=settings.MEDIA_ROOT/file_path;
        dst=settings.MEDIA_ROOT/'audio/test.wav'
        print(src)
        
        sound=AudioSegment.from_mp3(src)
        sound.export(dst,format="wav")
        
        sample_audio = sr.AudioFile(str(dst))
        with sample_audio as audio_file:
            audio = r.record(audio_file)

        src_lang = dic[dic.index(src_lang)+1]
            
        to_lang = dic[dic.index(to_lang)+1]
        
        try:
            query = r.recognize_google(audio, language=src_lang)
            print(f"The User said {query}\n")
        except Exception as e:
            
            return "Cannot Translate It Correctly"
        
        translator = Translator()
        text_to_translate = translator.translate(query, dest=to_lang)
        text = text_to_translate.text
        os.remove(str(src))
        os.remove(str(dst))
        return text
        
    def post(self,request,format=None):
        serializer = FileSerializer(data=request.data)
       # print(serializer.data)
        # print('ok1')
        # print(serializer)
        if(serializer . is_valid()):
            serializer.save()
            # print('ok')

            cursor=connection.cursor()
            cursor.execute("select inputLang , outputLang ,audioFile from api_file WHERE id=(SELECT max(id) from api_file)")
            row = cursor.fetchall()
            
            data=row[0]
            
            text_data=self.audiototext(data[0],data[1],data[2])
            print(text_data)                                                                                            #***********
            return Response({'msg': 'File uploaded successfully','status':'success','File':serializer.data,'output':text_data},status=status.HTTP_201_CREATED)
        return Response({'msg':'failed','status':'failed'})


    def get(self,request,format=None):
        file=File.objects.all()
        serializer = FileSerializer(file,many=True)
        
        return Response({'msg': 'File found successfully','status':'success','File':serializer.data},status=status.HTTP_201_CREATED)

class SpeechView(APIView):

    def audiototext(self,src_lang,to_lang,file_path):
        r = sr.Recognizer()
        src=settings.MEDIA_ROOT/file_path;
        dst=settings.MEDIA_ROOT/'audio/test.wav'
        
        sound=AudioSegment.from_mp3(src)
        sound.export(dst,format="wav")
        
        sample_audio = sr.AudioFile(str(dst))
        with sample_audio as audio_file:
            audio = r.record(audio_file)

        src_lang = dic[dic.index(src_lang)+1]
            
        to_lang = dic[dic.index(to_lang)+1]
        
        try:
            query = r.recognize_google(audio, language=src_lang)
            print(f"The User said {query}\n")
        except Exception as e:
            
            return "Cannot Translate It Correctly"
        
        translator = Translator()
        text_to_translate = translator.translate(query, dest=to_lang)
        text = text_to_translate.text
        # os.remove(str(src))
        # os.remove(str(dst))
        return text


    def post(self,request,format=None):
        serializer = FileSerializer(data=request.data)
        dst=settings.MEDIA_ROOT/'audio/test.mp3'
       # print(serializer.data)
        # blobdata=request.POST["audioFile"]
        # print(type(blobdata))
        data=request.data
        src_lang=data['inputLang']
        dst_lang=data['outputLang']
        toggle=data['toggle']
        # print(serializer.data)
        print(type(data['file']))
        
        blobdata=data['file'].read()
        print(type(blobdata))
        s = io.BytesIO(blobdata)
        print(type(s))
        audio = AudioSegment.from_raw(s, sample_width=2,frame_rate=44100, channels=2).export(dst, format='mp3')
        # audio = AudioSegment.from_raw(s, format='').export(dst, format='wav')
        # os.remove(dst)
        # print(data['audioFile'])
        # print(data['audioFile']['PromiseResult'])

        # text_data=self.audiototext(data['inputLang'],data['outputLang'],data['audioFile'])
        # print(text_data)  


        
        # if(serializer . is_valid()):
        #     serializer.save()
        #     print('ok')

        #     cursor=connection.cursor()
        #     cursor.execute("select inputLang , outputLang ,audioFile from api_file WHERE id=(SELECT max(id) from api_file)")
        #     row = cursor.fetchall()
            
        #     data=row[0]
            
        #     text_data=self.audiototext(data[0],data[1],data[2])
        #     print(text_data)                                                                                            #***********
        #     return Response({'msg': 'File uploaded successfully','status':'success','File':serializer.data,'output':text_data},status=status.HTTP_201_CREATED)
        # if(serializer.is_valid()):
        text_data=self.audiototext(src_lang,dst_lang,dst)


        str2Match = text_data
        strOptions = ["My name is deepak",
                    "My Name is akash.",
                    "we are team codehunters.",
                    "i am proud of you",
                    "we should work hard",
                    "who are you. i am proud of you",
                    "who are you",
                    "its cold outside",
                    "good morning to all of you",
                    "my team has five members"]
        Ratios = process.extract(str2Match,strOptions)
        # You can also select the string with the highest matching percentage
        highest = process.extractOne(str2Match,strOptions)

        print(highest)

        print(toggle    )
        if toggle=='false':    
            text_data="Police :"+text_data
        else:
            text_data="Criminal :"+text_data
        print(text_data)                                                                                            #***********
        return Response({'msg': 'File uploaded successfully','status':'success','output':text_data},status=status.HTTP_201_CREATED)
        # return Response({'msg':'failed','status':'failed'})

    
class SessionView(APIView):
    def get(self,request,format=None):
        user=request.session.get('user')
        print(user)
        if(user):
            return Response({'msg':'success','status':'success'})
        return Response({'msg':'failed','status':'failed'})



def getSession(request):
    user=request.session.get('user')
    print('session user =',user)
    # if(user):
    #     return Response({'msg':'success','status':'success'})
    # return Response({'msg':'failed','status':'failed'})
    return HttpResponse('data={}'.format(user))

@csrf_exempt
def setSession(request):
    data=request.POST['userName']
    print(type(data))
    print('dada=',data)
    a=str(data).lstrip()
    print('a=',a)
    request.session["user"]=a
    return HttpResponse('okk')





