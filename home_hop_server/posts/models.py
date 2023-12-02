from django.db import models
from accounts.models import User


class Tag(models.Model):
    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name

class Post(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(default=None, blank=True)

    image = models.ImageField(upload_to='post_pics/', blank=True, default='default/te.jpg')
    guests = models.IntegerField(default=1)
    rating = models.FloatField(default=0)

    tags = models.ManyToManyField(Tag, blank=True)

    price = models.IntegerField(default=0)
    location = models.CharField(max_length=100, default=',')

    bathrooms = models.IntegerField(default=1)
    bedrooms = models.IntegerField(default=1)
    beds = models.IntegerField(default=1)
    amenities = models.CharField(max_length=400, default=',')

    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    by_user = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)

    def average_rating(self):
        reviews = self.comments.all()
        if reviews:
            total_rating = sum(review.review for review in reviews)
            average = total_rating / len(reviews)
            return round(average, 2)  # Round to 2 decimal places
        return 0  # Default rating if there are no reviews
    
    def __str__(self):
        return self.title
    

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    review = models.IntegerField(default=1)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} - {self.post}'
