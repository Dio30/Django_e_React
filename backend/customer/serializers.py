from rest_framework import serializers
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'usuario', 'primeiro_nome', 'ultimo_nome']
        
    def clean(self):
        u = self.clean('primeiro_nome')
        user = Customer.objects.filter(primeiro_nome=u)
        if user.exists():
            raise serializers.ValidationError(f'O primeiro_nome {u} já existe.')
        
        if u.isnumeric():
            raise serializers.ValidationError('O primeiro_nome não pode ser somente numérico.')
        return u