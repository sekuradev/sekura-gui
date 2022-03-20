from sekuracore.integrations import integrations


class GitHub:
    name = "GitHub"
    description = "Provides public and private repositories and other development tools"


integrations.register(GitHub)
