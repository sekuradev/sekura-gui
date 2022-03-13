from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.contrib.auth import get_user_model
from rest_framework import generics

from . import models
from . import serializers

def index(request):
    return render(request, "index.html")

class UserDetails(generics.RetrieveAPIView):
    queryset = get_user_model().objects.all().prefetch_related('organizations')
    serializer_class = serializers.UserDetails

    def get_object(self):
      queryset = self.get_queryset()
      pk = self.request.resolver_match.kwargs.get("pk", self.request.user.pk)
      obj = get_object_or_404(queryset, pk=pk)
      return obj

class OrganizationList(generics.ListAPIView):
    queryset = models.Organization.objects.all()
    serializer_class = serializers.OrganizationDetails
