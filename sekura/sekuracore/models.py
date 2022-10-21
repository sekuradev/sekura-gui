from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.dispatch import receiver

from . import signals


class Organization(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    users = models.ManyToManyField(get_user_model(), related_name="organizations")

    def __str__(self):
        return self.name


class Integration(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200, blank=True, null=True)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name="integration_configuration")

    object_id = models.PositiveIntegerField()
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    content_object = GenericForeignKey("content_type", "object_id")

    def __str__(self):
        return f"{self.organization} / {self.name}"


class Access(models.Model):
    integration = models.ForeignKey(Integration, on_delete=models.CASCADE)

    external_id = models.CharField(max_length=50)
    login = models.CharField(max_length=100)
    kind = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    role = models.CharField(max_length=100)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class AccessGroup(models.Model):
    integration = models.ForeignKey(Integration, on_delete=models.CASCADE)

    name = models.CharField(max_length=100)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


@receiver(signals.access_team_found)
def access_team_found(integration, name, **kwargs):
    pass
