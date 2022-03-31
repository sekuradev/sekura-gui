from sekuracore.integrations import integrations

from . import models


class GitHub:
    name = "GitHub"
    description = "Provides public and private repositories and other development tools"

    class Meta:
        model = models.Config

    def get_config(self):
        return {
            "description": "",
            "fields": [
                {
                    "name": "token",
                    "type": "chars",
                    "length": 200,
                },
                {
                    "name": "url",
                    "type": "chars",
                    "length": 200,
                    "mandatory": False,
                },
            ],
        }


integrations.register(GitHub)
