from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import create_post, PostListView, post_details, comment, update_post, check_post, delete_post, check_user_post, check_reviews


urlpatterns = [
    # Basic CRUD for posts
    path('create/', create_post),
    path('view/', PostListView.as_view()),
    path('edit/<int:post_id>/', update_post),
    path('delete/<int:post_id>/', delete_post),
    
    # Miscellaneous
    path('view/<int:id>', post_details),
    path('view/<str:by_user>/', check_post),
    path('view_user_post/', check_user_post),

    # Basic CRUD for comments
    path('<int:post_id>/comments/', comment),
    path('comments/', check_reviews)
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
