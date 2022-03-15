from django.utils.module_loading import autodiscover_modules
from sekuracore.integrations import integrations

def autodiscover():
    autodiscover_modules("sekura", register_to=integrations)
