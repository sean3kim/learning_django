from django.urls import path

from . import views

app_name='orders'
urlpatterns = [
    path('create-payment-intent/', views.StripeIntentView.as_view()),
    path('success/', views.OrderSuccessView.as_view()),
    path('item/', views.OrderItemListCreateView.as_view()),
    path('item/<str:pk>/', views.OrderItemDetailUpdateDeleteView.as_view()),
    path('address/', views.ShippingAddressListCreateView.as_view()),
    path('address/<str:pk>/', views.ShippingAddressDetailUpdateDeleteView.as_view()),
    path('<str:pk>/', views.OrderDetailUpdateDeleteView.as_view()),
    path('', views.OrderListCreateView.as_view()),
]