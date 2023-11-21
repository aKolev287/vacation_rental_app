from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['id', 'title', 'description', 'date', 'user', "by_user"]
        

    def create(self, validated_data):
        return Post.objects.create(**validated_data)