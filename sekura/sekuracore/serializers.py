from rest_framework import serializers
from . import models

class OrganizationSerializer1(serializers.ModelSerializer):
    class Meta:
        model = models.Organization
        fields = '__all__'
        depth = 1
