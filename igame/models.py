from django.db import models

# Create your models here.

class Publisher(models.Model):
    id = models.AutoField(primary_key=True) # 创建自增的一个主键
    name = models.CharField(null=False, max_length=64, unique=True) #varchar且不能为空的字段

class Player(models.Model):
    name = models.CharField(max_length=50, primary_key =True)
    password = models.CharField(max_length=50)
    bestScore = models.PositiveIntegerField()
    def __str__(self):
        return "%s-%s-%d"%(self.name, self.password,self.bestScore)
