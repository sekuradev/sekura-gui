import json
from django.test import TestCase
from django.urls import resolve
from django.contrib.auth import get_user_model
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate

from . import factories

from sekuracore import views

class UserTest(TestCase):
    def _test_anonymous(self):
        user = factories.UserFactory()
        apirf = APIRequestFactory()
        request = apirf.get(f'/user/1')
        request.resolver_match = resolve(request.path)
        view = views.UserDetails.as_view()
        response = view(request)
        assert response.status_code == 404

    def test_get_self(self):
        user = factories.UserFactory()
        apirf = APIRequestFactory()
        request = apirf.get(f'/user/{user.id}')
        request.resolver_match = resolve(request.path)
        force_authenticate(request, user=user)
        view = views.UserDetails.as_view()
        response = view(request)
        assert response.data["id"] == user.id

class UserDefaultTest(TestCase):
    def _test_anonymous(self):
        client = RequestsClient()
        apirf = APIRequestFactory()
        request = apirf.get('/user/')
        request.resolver_match = resolve(request.path)
        view = views.UserDetails.as_view()
        response = view(request)
        assert response.status_code == 404

    def test_when_user_not_set_use_logged(self):
        user = factories.UserFactory()
        apirf = APIRequestFactory()
        request = apirf.get('/user/')
        request.resolver_match = resolve(request.path)
        force_authenticate(request, user=user)
        view = views.UserDetails.as_view()
        response = view(request)
        assert response.data["id"] == user.id
