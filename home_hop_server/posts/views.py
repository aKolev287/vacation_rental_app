import jwt
import datetime
from rest_framework import generics, status
from .models import Post, User
from .serializers import PostSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.decorators import api_view



class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


@api_view(['GET'])
def post_details(request, id):
    try:
        post = Post.objects.get(id=id)
        print(f'post: {post}')
        serializer = PostSerializer(post)
        return Response(serializer.data)
    except post.DoesNotExist:
        return Response({'status': '404 Not Found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_post(request):
    try:
        token = request.COOKIES.get('jwt')
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        user = User.objects.filter(id=payload['id']).first()
        data = request.data

        """
        The QueryDicts at request.POST and request.GET will be immutable when accessed in a normal request/response cycle.
        This leaves the object the same 
        """
        # remember old state
        _mutable = data._mutable
        # set to mutable
        data._mutable = True
        # сhange the values you want
        data['user_id'] = user.id
        data['by_user'] = user.username
        # set mutable flag back
        data._mutable = _mutable
        
        serializer = PostSerializer(data=data)

        # Validate and save the data
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    except jwt.ExpiredSignatureError:
        return Response({'error': 'Token has expired'}, status=status.HTTP_401_UNAUTHORIZED)
    except jwt.InvalidTokenError:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

