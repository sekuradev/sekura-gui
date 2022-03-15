class Integrations:
    def __init__(self):
        self._registry = {}

    def register(self, clazz):
        self._registry[clazz.name] = clazz


integrations = Integrations()
