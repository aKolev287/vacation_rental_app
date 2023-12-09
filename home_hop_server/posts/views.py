from django.shortcuts import get_object_or_404
import jwt
from rest_framework import generics, status
from .models import Post, User, Comment, Reserve
from .serializers import PostSerializer, CommentSerializer, ReserveSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from home_hop_server.conf import MainPagination
from .filters import PostFilter
from django_filters.rest_framework import DjangoFilterBackend

# TODO: fix the by_user attribute.

class PostListView(generics.ListAPIView):
    serializer_class = PostSerializer
    pagination_class = MainPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = PostFilter

    def get_queryset(self):
        queryset = Post.objects.all()
        
        for post in queryset:
            post.rating = post.average_rating()
            post.save()
        return queryset

@api_view(['GET', 'POST'])
def reservation(request, post_id):
    post = get_object_or_404(Post, pk=post_id)

    if request.method == 'GET':
        reserve = Reserve.objects.filter(post=post)
        serializer = ReserveSerializer(reserve, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        token = request.COOKIES.get('jwt')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            user = User.objects.get(id=payload['id'])
        except jwt.ExpiredSignatureError:
            return Response({"error": "Token has expired"}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ReserveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(post=post, user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def post_details(request, id):
    try:
        post = Post.objects.get(id=id)
        print(f'post: {post.id}')
        serializer = PostSerializer(post)
        data = serializer.data
        data['rating'] = post.average_rating()
        return Response(data)
    
    except post.DoesNotExist:
        return Response({'status': '404 Not Found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
def comment(request, post_id):
    post = get_object_or_404(Post, pk=post_id)  # Use get_object_or_404 to handle Post not found case

    if request.method == 'GET':
        comments = Comment.objects.filter(post=post)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        token = request.COOKIES.get('jwt')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            user = User.objects.get(id=payload['id'])
        except jwt.ExpiredSignatureError:
            return Response({"error": "Token has expired"}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(post=post, user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    

@api_view(['GET'])
def check_post(request, by_user):

    posts = Post.objects.filter(by_user=by_user)
    
    for post in posts:
        post.rating = post.average_rating()

    serialized_posts = [PostSerializer(post).data for post in posts]

    return Response(serialized_posts)

@api_view(['GET'])
def check_reviews(request):
    token = request.COOKIES.get('jwt')
    payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    user = User.objects.filter(id=payload['id']).first()
    review = Comment.objects.filter(user=user)

    serializer = CommentSerializer(review, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def check_user_post(request):
    token = request.COOKIES.get('jwt')
    payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    user = User.objects.filter(id=payload['id']).first()
    posts = Post.objects.filter(by_user=user)
    
    for post in posts:
        post.rating = post.average_rating()

    serialized_posts = [PostSerializer(post).data for post in posts]

    return Response(serialized_posts)


@api_view(['PATCH'])
def update_post(request, post_id):

    token = request.COOKIES.get('jwt')
    payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    user = User.objects.filter(id=payload['id']).first()

    post = Post.objects.filter(id=post_id, by_user=user.username).first()

    if not post:
        return Response({'error': 'Post not found or you do not have permission to update this post.'}, status=404)

    if post.by_user != user.username:
        return Response({'error': 'You do not have permission to update this post.'}, status=403)


    serialized_post = PostSerializer(post, data=request.data, partial=True)

    if serialized_post.is_valid():

        serialized_post.save()
        return Response({'message': 'Post updated successfully'})
    else:
        return Response({'error': serialized_post.errors}, status=400)


@api_view(['DELETE'])
def delete_post(request, post_id):
    token = request.COOKIES.get('jwt')
    payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    user = User.objects.filter(id=payload['id']).first()
    post = Post.objects.filter(id=post_id, by_user=user.username).first()
    if not post:
        return Response({'error': 'Post not found or you do not have permission to delete this post.'}, status=404)

    if post.by_user != user.username:
        return Response({'error': 'You do not have permission to delete this post.'}, status=403)

    post.delete()

    return Response({'message': 'Post deleted successfully'})

