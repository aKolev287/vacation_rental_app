# Generated by Django 4.2.7 on 2023-11-27 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0007_comment_review_delete_review'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='rating',
            field=models.FloatField(default=0),
        ),
    ]
