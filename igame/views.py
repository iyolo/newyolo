from django.shortcuts import render,redirect,HttpResponse
from igame.models import Player


def index(request):
    return render(request, 'igame/index.html')


def igame(request):
    return render(request, 'igame/igame.html')


def igame24(request):
    return render(request, 'igame/igame24.html')


def igame24play(request):
    return render(request, 'igame/igame24play.html')


def ranking(request):
    users = Player.objects.all()
    return render(request, 'igame/ranking.html', {"bestPlayer":users})





def signin(request):
    if request.method == 'GET':
        return render(request, 'igame/signin.html')
    elif request.method == "POST":
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)
        if username and password:  # 确保用户名和密码都不为空
            username = username.strip()
            try:
                user = Player.objects.get(name=username)
            except:
                return render(request, 'igame/signin.html')
            if user.password == password:
                return redirect(ranking)
    return render(request, 'igame/signin.html')





def signup(request):
    if request.method == 'GET':
        return render(request, 'igame/signup.html')
    elif request.method == "POST":
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)
        confirm = request.POST.get('confirm', None)
        if username and password and confirm:
            if password == confirm:
                try:
                    Player.objects.get(name=username)
                except:
                    newuser = Player()
                    newuser.name = username
                    newuser.password = password
                    newuser.bestScore = 0
                    newuser.save()
                    return redirect(signin)
                return render(request, 'igame/signup.html')
            else:
                return render(request, 'igame/signup.html')
        else:
            return render(request, 'igame/signup.html')
    return render(request, 'igame/signup.html')








