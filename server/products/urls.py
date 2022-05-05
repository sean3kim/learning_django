from django.urls import path

from . import views

app_name = 'products'
urlpatterns = [
    path('apparel/<str:pk>/', views.ApparelDetailUpdateDeleteView.as_view()),
    path('apparel/tags/<str:tag>/', views.ApparelByTagListView.as_view()),
    path('apparel/', views.ApparelListCreateView.as_view()),
    path('climbing/<str:pk>/', views.ClimbingDetailUpdateDeleteView.as_view()),
    path('climbing/', views.ClimbingListCreateView.as_view()),
    path('tags/', views.TagListCreateView.as_view()),
]