# Generated by Django 4.2.7 on 2023-12-09 00:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0014_reserve'),
    ]

    operations = [
        migrations.AddField(
            model_name='reserve',
            name='guests',
            field=models.IntegerField(default=1),
        ),
    ]
