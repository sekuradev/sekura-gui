import json

from django.test import TestCase
from django.urls import resolve
from rest_framework.test import APIRequestFactory, force_authenticate
from sekuracore import views

from . import factories


class AvailableIntegrationTest(TestCase):
    def test_get_integrations_authenticated(self):
        user = factories.UserFactory()
        apirf = APIRequestFactory()
        request = apirf.get("/integration/available/")
        force_authenticate(request, user=user)
        request.resolver_match = resolve(request.path)
        view = views.AvailableIntegrationList.as_view()
        response = view(request)
        results = json.loads(response.content)["results"]
        assert any(x["name"] == "GitHub" for x in results)
