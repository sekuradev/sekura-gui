from django.apps import AppConfig


class SekuracoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'sekuracore'

    def ready(self):
        super().ready()
        self.module.autodiscover()
