from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class Organization(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class Integration(models.Model):
    object_id = models.PositiveIntegerField()
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    content_object = GenericForeignKey("content_type", "object_id")


class IntegrationConfiguration(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name="integration_configuration")
    integration = models.ForeignKey(Integration, on_delete=models.CASCADE, related_name="integration_configuration")

    object_id = models.PositiveIntegerField()
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    content_object = GenericForeignKey("content_type", "object_id")

