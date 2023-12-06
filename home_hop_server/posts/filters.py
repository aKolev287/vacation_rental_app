import django_filters
from .models import Post

class PostFilter(django_filters.FilterSet):
    tags = django_filters.ChoiceFilter(choices=Post.OPTIONS, lookup_expr='iexact')

    class Meta:
        model = Post
        fields = ['tags']