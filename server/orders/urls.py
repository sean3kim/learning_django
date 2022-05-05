from django.urls import path

from . import views

app_name='orders'
urlpatterns = [
    path('', views.OrderListCreateView.as_view()),
    path('item/', views.OrderItemListCreateView.as_view()),
    path('item/<str:pk>/', views.OrderItemDetailUpdateDeleteView.as_view()),
    path('<str:pk>/', views.OrderDetailUpdateDeleteView.as_view()),
]