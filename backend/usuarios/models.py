from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.template.defaultfilters import slugify
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class AppUserManager(BaseUserManager):
	def create_user(self, username, password=None):
		if not username:
			raise ValueError('An username is required.')
		if not password:
			raise ValueError('A password is required.')
		user = self.create_user(username=username)
		user.set_password(password)
		user.save()
		return user

	def create_superuser(self, username, password=None):
		if not username:
			raise ValueError('An username is required.')
		if not password:
			raise ValueError('A password is required.')
		user = self.create_user(username, password)
		user.is_superuser = True
		user.save()
		return user

class User(AbstractUser, PermissionsMixin):
    email = models.EmailField(max_length=100)
    endereco = models.CharField(max_length=100, help_text='Insira o seu endereço.', null=True, blank=True)
    cidade = models.CharField(max_length=100, help_text='Insira a sua cidade.', null=True, blank=True)
    bairro = models.CharField(max_length=100, help_text='Insira o seu bairro.', null=True, blank=True)
    estado = models.CharField(max_length=100, help_text='Insira o seu estado.', null=True, blank=True)
    cep = models.CharField(max_length=8, null=True, blank=True)
    slug = models.SlugField(unique=True, blank=True, null=True)
    
    USERNAME_FIELD = 'username'
    
    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
        
    def __str__(self):
        return self.username
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.username)
        else:
            self.slug = slugify(self.username)
        return super().save(*args, **kwargs)
    
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
