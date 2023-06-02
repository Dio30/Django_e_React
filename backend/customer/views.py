from .serializers import CustomerSerializer
from rest_framework import viewsets, generics, pagination
from rest_framework.views import Response
from rest_framework.authtoken.models import Token
from .models import Customer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.authentication import SessionAuthentication

class CustomerList(viewsets.ModelViewSet):
    """
    API para fazer um CRUD completo simulando cadastro de pessoas.
    """
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['usuario', 'primeiro_nome', 'ultimo_nome']
    pagination_class = pagination.LimitOffsetPagination
    permission_classes = [IsAuthenticatedOrReadOnly,]
    authentication_classes = [SessionAuthentication,]
    
class CustomerListView(generics.ListAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    
    def get(self, request, *args, **kwargs):
        # Gera ou recupera o token de autenticação do usuário
        token = Token.objects.get(user=self.request.user)
        
        # Define o token no cookie de resposta
        response = self.list(request, *args, **kwargs)
        response.set_cookie('token', token.key)
        
        return Response(response.data)