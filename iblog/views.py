from django.shortcuts import render
from django.core.paginator import  Paginator
from .models import Blog_contant,BlogType,Project,AboutMe
from csp.decorators import csp
from csp.decorators import csp_exempt
# Create your views here.

auth={}
auth['username'] = 'YOLO'   # 名字
auth['userimgpath'] = '/static/img/william.jpg'  # 头像地址
auth['motto'] = '学习是一种信仰！'  # 座右铭
auth['github'] = 'https://github.com/iyolo'  # 项目地址

@csp(DAFULE_SRC=["none"],IMG_SRC=["'self'"],SCRIPT_SRC=["'self' 'unsafe-inline' 'unsafe-eval' http://busuanzi.ibruce.info/"],
     STYLE_SRC=["'self' https://cdn.jsdelivr.net/"])
def index(request):
    """首页"""
    global auth
    project = Project.objects.all()   # 首页博客信息
    return render(request,'iblog/index.html',{'pro':project,'auth':auth})

@csp(DAFULE_SRC=["*"],IMG_SRC=["'self'"],SCRIPT_SRC=["'self' 'unsafe-inline' 'unsafe-eval' http://busuanzi.ibruce.info/"],
     STYLE_SRC=["https://cdn.jsdelivr.net/ 'self' 'unsafe-inline'"])
def blog(request,type=None):
    """博客面展示"""
    global auth
    page_num = request.GET.get('page', 1)
    if type:
        blog_all_list = Blog_contant.objects.filter(blog_type = type)
    else:
        blog_all_list = Blog_contant.objects.all()
    paginator = Paginator(blog_all_list,6)  # 每10页进行分页
    page_of_blogs = paginator.get_page(page_num)
    project = Project.objects.all()
    total=Blog_contant.objects.all().count()   # 计算博客的总数
    page_nums = page_of_blogs.number #获取但钱页码
    # 将博客的分类以及数量都打印出来
    Type_all=[]
    for blogtype in BlogType.objects.all():
        Types = {}          # 对传入的参数进行适配
        Types['type'] = blogtype
        Types['type_count'] = Blog_contant.objects.filter(blog_type=blogtype).count()
        Types['type_id'] = blogtype.id
        Type_all.append(Types)
    return render(request,'iblog/blog.html',{'Them':page_of_blogs,'totals':total,'types':Type_all,'pro':project,'auth':auth})

@csp(DAFULE_SRC=["none"],IMG_SRC=["'self'"],SCRIPT_SRC=["'self' 'unsafe-inline' 'unsafe-eval' http://busuanzi.ibruce.info/"],
     STYLE_SRC=["https://cdn.jsdelivr.net/npm/  'self'"])
def DetailBlog(request,id):
    '''每一页的博客的详细内容'''
    global auth
    blogDetail = Blog_contant.objects.get(id=id)  # 定位到当前博客的位置
    project = Project.objects.all()
    all_blog = Blog_contant.objects.all()
    Type_all = []
    # 博客上下页功能
    try:
        preblog = Blog_contant.objects.get(id=id-1)
    except:preblog=None
    try:
        nextblog = Blog_contant.objects.get(id=id+1)
    except:nextblog=None
    for blogtype in BlogType.objects.all():
        Types = {}
        Types['type'] = blogtype
        Types['type_count'] = Blog_contant.objects.filter(blog_type=blogtype).count()
        Types['type_id'] = blogtype.id
        Type_all.append(Types)
    return render(request,'iblog/cons.html',{'Thme':blogDetail,'side_in':all_blog,'types':Type_all,'pro':project,'auth':auth,'pre':preblog,'next':nextblog})


@csp(DAFULE_SRC=["*"],IMG_SRC=["'self'"],SCRIPT_SRC=["'self' 'unsafe-inline' 'unsafe-eval' http://busuanzi.ibruce.info/"],
     STYLE_SRC=["https://cdn.jsdelivr.net/ 'self' "])
def List(request):
    """"所有博客列表"""
    global auth
    all_blog = Blog_contant.objects.all()
    project = Project.objects.all()
    Type_all = []
    for blogtype in BlogType.objects.all():
        Types = {}
        Types['type'] = blogtype
        Types['type_count'] = Blog_contant.objects.filter(blog_type=blogtype).count()
        Types['type_id'] = blogtype.id
        Type_all.append(Types)
    return render(request,'iblog/lists.html',{'AllBlog':all_blog,'types':Type_all,'pro':project,'auth':auth})

@csp(DAFULE_SRC=["*"],IMG_SRC=["'self'"],SCRIPT_SRC=["'self' 'unsafe-inline' 'unsafe-eval' http://busuanzi.ibruce.info/"],
     STYLE_SRC=["https://cdn.jsdelivr.net/ 'self' "])
def about(request):
    '''关于我'''
    global auth
    project = Project.objects.all()
    Type_all = []
    for blogtype in BlogType.objects.all():
        Types = {}
        Types['type'] = blogtype
        Types['type_count'] = Blog_contant.objects.filter(blog_type=blogtype).count()
        Types['type_id'] = blogtype.id
        Type_all.append(Types)
    about = AboutMe.objects.all()
    return render(request,'iblog/about.html',{'types':Type_all,'pro':project,'auth':auth,'about':about})
