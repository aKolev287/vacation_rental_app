from rest_framework import serializers
from .models import User, HostProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
                'id', 'username', 'email', 'password', 
                'first_name', 'last_name', 'bio', 
                'pfp', 'lives_in', 'works_in', 'speaks', 'role'
                  ]
        extra_kwargs = {
            'password': {'write_only': True},
            'bio': {'required': False},
            'pfp': {'required': False},
            'lives_in': {'required': False},
            'works_in': {'required': False},
            'speaks': {'required': False},
            'role': {'required': False},
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'bio', 'pfp', 'lives_in', 'works_in', 'speaks', 'role'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
        }    

class HostProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = HostProfile
        fields = "__all__"