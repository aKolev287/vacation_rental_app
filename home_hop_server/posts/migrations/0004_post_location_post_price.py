# Generated by Django 4.2.7 on 2023-11-22 15:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0003_alter_post_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='location',
            field=models.CharField(default=',', max_length=100),
        ),
        migrations.AddField(
            model_name='post',
            name='price',
            field=models.IntegerField(default=0),
        ),
    ]
