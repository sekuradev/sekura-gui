from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from sekuracore import models as sekura_models


class Config(models.Model):
    token = models.CharField(max_length=80)
    url = models.CharField(max_length=200, null=True, blank=True)
    organization = models.CharField(max_length=200)

    integration = GenericRelation(sekura_models.Integration, related_query_name="config")

    def __str__(self):
        result = f"...{self.token[-2:]} {self.organization}"
        if self.url:
            result += f" ({self.url})"
        return result
