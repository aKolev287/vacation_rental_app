from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    email = models.CharField(max_length=128, unique=True)
    password = models.CharField(max_length=255)
    bio = models.TextField(max_length=1000, blank=True)
    pfp = models.ImageField(upload_to='profile_pics/', default='default/default.jpg')
    lives_in = models.CharField(max_length=255, blank=True)
    works_in = models.CharField(max_length=255, blank=True)
    speaks = models.CharField(max_length=255, blank=True)
    role = models.CharField(max_length=50, choices=[('Host', 'Host'), ('User', 'User')], default='User')



class HostProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    rating = models.FloatField()
    reviews = models.TextField()
    years_hosting = models.PositiveIntegerField()