# Generated by Django 2.2 on 2022-08-16 19:36

import ckeditor_uploader.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('iblog', '0006_auto_20220816_1851'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog_contant',
            name='content',
            field=ckeditor_uploader.fields.RichTextUploadingField(),
        ),
    ]
