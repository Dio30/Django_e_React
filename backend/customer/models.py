from django.db import models
from usuarios.models import User

class Customer(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    primeiro_nome = models.CharField(max_length=100, null=False, blank=False)
    ultimo_nome = models.CharField(max_length=100, null=False, blank=False)
    
    class Meta:
        ordering = ['id', 'primeiro_nome', 'ultimo_nome']
    
    def __str__(self):
        return f'{self.primeiro_nome} {self.ultimo_nome}'
