from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from django.views import View
from rest_framework import generics

from . import models, serializers
from .integrations import integrations


def index(request):
    return render(request, "index.html")


class UserDetails(generics.RetrieveAPIView):
    queryset = get_user_model().objects.all().prefetch_related("organizations")
    serializer_class = serializers.UserDetails

    def get_object(self):
        queryset = self.get_queryset()
        pk = self.request.resolver_match.kwargs.get("pk", self.request.user.pk)
        obj = get_object_or_404(queryset, pk=pk)
        return obj


class OrganizationList(generics.ListAPIView):
    queryset = models.Organization.objects.all()
    serializer_class = serializers.OrganizationDetails


class AvailableIntegrationList(View):
    def get(self, foo=""):
        serializer = serializers.AvailableIntegration(integrations.get().values(), many=True)
        return JsonResponse(
            {"results": serializer.data},
        )
