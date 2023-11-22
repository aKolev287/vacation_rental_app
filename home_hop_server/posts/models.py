from django.db import models
from accounts.models import User


class Tag(models.Model):
    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name
    
# TODO: finish the model.
class Post(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(default=None, blank=True)

    image = models.ImageField(upload_to='post_pics/', blank=True, default='default/te.jpg')
    guests = models.IntegerField(default=1)
    rating = models.IntegerField(default=0)

    price = models.IntegerField(default=0)
    location = models.CharField(max_length=100, default=',')


    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    by_user = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title