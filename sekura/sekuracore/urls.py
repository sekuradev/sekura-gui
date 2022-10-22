from django.urls import path

from . import views

urlpatterns = [
    path("user/<int:pk>", views.UserDetails.as_view(), name="user"),
    path("user/", views.UserDetails.as_view(), name="currentuser"),
    path("integrationavailable/", views.AvailableIntegrationList.as_view(), name="availableintegrations"),
    path("organization/<int:orgid>/integration/", views.IntegrationList.as_view(), name="integration"),
    path("organization/<int:orgid>/integration/<int:pk>/", views.Integration.as_view(), name="integration"),
]
