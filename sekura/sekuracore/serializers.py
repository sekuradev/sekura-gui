from django.contrib.auth import get_user_model
from rest_framework import serializers

from . import models


class Organization(serializers.ModelSerializer):
    class Meta:
        model = models.Organization
        fields = "__all__"
        depth = 0


class User(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        exclude = ["password"]
        depth = 0


class OrganizationDetails(serializers.ModelSerializer):
    users = User(many=True, read_only=True)

    class Meta:
        model = models.Organization
        fields = "__all__"
        depth = 1


class UserDetails(serializers.ModelSerializer):
    organizations = Organization(
        many=True,
        read_only=True,
    )

    class Meta:
        model = get_user_model()
        exclude = ["password"]
        depth = 1


class AvailableIntegration(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    description = serializers.CharField(max_length=200)
