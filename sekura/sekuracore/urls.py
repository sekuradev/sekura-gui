from django.urls import path
from . import views

urlpatterns = [
        path("user/<int:pk>", views.UserDetails.as_view(), name="user"),
        path("user/", views.UserDetails.as_view(), name="currentuser"),
]

