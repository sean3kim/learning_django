from django.urls import path
from . import views

app_name = 'users'
urlpatterns = [
    path('register/', views.UserListCreateView.as_view()),
    path('login/', views.LoginView.as_view()),
    path('logout/', views.LogoutView.as_view()),
    path('status/', views.IsLoggedInView.as_view()),
    path('<str:pk>/', views.UserDetailUpdateDeleteView.as_view()),
    path('', views.UserListCreateView.as_view()),
]