from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import create_post, PostListView #PostListCreateView PostCreateView

urlpatterns = [
    # Basic CRUD for posts
    path('create/', create_post),
    path('view/', PostListView.as_view())
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
