from django.urls import path

from . import views

app_name='reviews'
urlpatterns = [
    path('', views.ReviewListCreateView.as_view()),
    path('<str:pk>', views.ReviewDetailUpdateDeleteView.as_view()),
]