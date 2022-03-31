from django.contrib import admin

from . import models


class IntegrationAdmin(admin.ModelAdmin):
    list_display = ("name", "organization", "content_type")


admin.site.register(models.Organization)
admin.site.register(models.Integration, IntegrationAdmin)
