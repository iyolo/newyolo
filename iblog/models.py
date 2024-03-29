# _*_ coding: utf-8 _*_

from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField
# Create your models here.


class BlogType(models.Model):
    """博客类型"""
    type_name= models.CharField(max_length=15)

    def __unicode__(self):
        return self.type_name

    # 返回一个种下拉菜单的名字中的名字
    def __str__(self):
        return self.type_name


class Blog_contant(models.Model):
    """博客总内容"""
    id = models.AutoField(primary_key = True)  # 建立博客了id，便于数据库的查找
    title=models.CharField(max_length=100)
    blog_type=models.ForeignKey(BlogType,on_delete=models.CASCADE)   # 博客类别
    #content =  RichTextUploadingField()
    content = RichTextField()
    author=models.ForeignKey(User,on_delete=models.CASCADE)    # 博客作者
    abstract = models.TextField()    # 博客摘要
    datetime = models.DateTimeField()   # 博客时间

    def __unicode__(self):
        return self.title

    class Meta:    # 按时间降序
        ordering = ['-datetime']


class Project(models.Model):
    """首页的项目表"""
    title = models.CharField(max_length=100)
    datetime = models.DateTimeField()  # 新的项目时间
    detail = RichTextUploadingField() # 简介
    url = models.CharField(max_length=200)  # 项目的链接
    type = models.CharField(max_length=200)  # 项目所属类型

    def __unicode__(self):
        return self.title

    class Meta:
        ordering = ['-datetime']

class AboutMe(models.Model):
    """About me"""
    introduce = RichTextUploadingField()
from django.db import models

# Create your models here.
