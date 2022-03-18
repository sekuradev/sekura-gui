class Integrations:
    def __init__(self):
        self._registry = {}

    def register(self, clazz):
        self._registry[clazz.name] = {
            "name": clazz.name,
            "class": clazz,
        }

    def get(self):
        return self._registry


integrations = Integrations()
