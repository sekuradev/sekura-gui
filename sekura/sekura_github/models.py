from django.db import models


class Config(models.Model):
    token = models.CharField(max_length=80)
    url = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        result = f"...{self.token[-2:]}"
        if self.url:
            result += f" ({self.url})"
        return result
