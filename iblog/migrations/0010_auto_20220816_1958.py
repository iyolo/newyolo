# Generated by Django 2.2 on 2022-08-16 19:58

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('iblog', '0009_auto_20220816_1954'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog_contant',
            name='content',
            field=ckeditor.fields.RichTextField(),
        ),
    ]
