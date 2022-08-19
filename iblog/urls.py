from django.contrib import admin
from django.urls import path
from django.conf.urls import url,include
from iblog.feeds import BlogRssFeed
from django.contrib.sitemaps.views import sitemap
from iblog.sitemaps import sitemaps
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [

    path('admin/', admin.site.urls),
    path('',views.index,name='index'),
    path('index',views.index),
    path('blog',views.blog,name='blog_list'),
    path('blog/<str:type>',views.blog,name='blog'),
    path('details/<int:id>',views.DetailBlog,name='detail'),
    path('lists',views.List, name='lists'),
    path('rss',BlogRssFeed(), name='rss'),
    path('about',views.about,name='about'),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='sitemap'),
    url('ckeditor', include('ckeditor_uploader.urls')),
]

urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
