from django.contrib.auth import get_user_model
from rest_framework import serializers

UserModel = get_user_model()

def custom_validation(data):
    username = data['username']
    password = data['password']
    user = UserModel.objects.filter(username=username)
    ##
    if user.exists():
        raise serializers.ValidationError(f'O usuário {username} já existe, tente novamente!')
    ##
    if not password or len(password) < 8:
        raise serializers.ValidationError('Escolha outra senha, min 8 caracteres!')
    return data


def validate_email(data):
    email = data['email']
    if not email:
        raise serializers.ValidationError('an email is needed')
    return True