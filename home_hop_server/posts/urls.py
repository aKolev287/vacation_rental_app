from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import create_post, PostListView, post_details, comment, edit_post


urlpatterns = [
    # Basic CRUD for posts
    path('create/', create_post),
    path('view/', PostListView.as_view()),
    path('view/<str:by_user>/', edit_post),
    # Miscellaneous
    path('view/<int:id>', post_details),

    # Basic CRUD for comments
    path('<int:post_id>/comments/', comment),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
