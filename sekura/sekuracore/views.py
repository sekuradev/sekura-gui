from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics

from . import models
from . import serializers

def index(request):
    return render(request, "index.html")

class OrganizationList(generics.ListAPIView):
    queryset = models.Organization.objects.all()
    serializer_class = serializers.OrganizationSerializer1
