from django.urls import path
from . import views

urlpatterns = [

    path('', views.index),
    path('igame', views.igame),
    path('igame24', views.igame24),
    path('igame24play', views.igame24play),
    path('ranking', views.ranking),
    path('signin', views.signin),
    path('signup', views.signup),
]