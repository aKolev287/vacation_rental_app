from rest_framework import serializers
from .models import Post, Comment
from accounts.serializers import UserSerializer
from accounts.models import User


class User(UserSerializer):
    class Meta:
        model = User
        fields = ['username', 'pfp']



class CommentSerializer(serializers.ModelSerializer):
    user = User(read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'



class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = ['id', 'title', 'description', 
                  'date', 'user_id', "by_user", 
                  'image', 'guests', 'rating', 
                  'price', 'location', 'bathrooms',
                  'bedrooms', 'beds', 'amenities','tags', 'comments' ]
        

    def create(self, validated_data):
        return Post.objects.create(**validated_data)