# Generated by Django 4.2.7 on 2023-11-26 19:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0006_alter_comment_post'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='review',
            field=models.IntegerField(default=1),
        ),
        migrations.DeleteModel(
            name='Review',
        ),
    ]
