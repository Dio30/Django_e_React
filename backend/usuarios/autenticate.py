from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import serializers

UserModel = get_user_model()

class AutenticateBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            # Tenta buscar o usuário usando o nome de usuário
            user = UserModel.objects.get(Q(username__iexact=username))
        except UserModel.DoesNotExist:
            raise serializers.ValidationError('Usuário invalido!')

        # Verifica se a senha fornecida é correta
        if user.check_password(password):
            return user
        raise serializers.ValidationError('Senha invalida!')

    def get_user(self, user_id):
        try:
            return UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None