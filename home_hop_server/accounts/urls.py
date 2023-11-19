from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView, UserListView, UpdateView, DeleteView, profile_details
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Basic CRUD for users
    path('register/', RegisterView.as_view()),
    path('user/', UserView.as_view()),
    path('edit/', UpdateView.as_view()),
    path('delete/', DeleteView.as_view()),

    # Log in and out for users
    path('logout/', LogoutView.as_view()),
    path('login/', LoginView.as_view()),

    # Miscellaneous
    path('users/', UserListView.as_view()),
    path('user/<slug:username>/', profile_details),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)