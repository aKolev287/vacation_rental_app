# Generated by Django 4.2.7 on 2023-12-06 20:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0012_remove_post_tags_post_tags'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Tag',
        ),
    ]
