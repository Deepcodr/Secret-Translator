from django.urls import path
from api import views


urlpatterns = [
    path('user',views.UserView.as_view()),  
    
    #path('getUser',views.SessionView.as_view()),
    path('upload',views.FileView.as_view()),
    path('sendAudio',views.SpeechView.as_view()),
    
    path('getUser',views.getSession),
    path('setUser',views.setSession),
    



     
] 
