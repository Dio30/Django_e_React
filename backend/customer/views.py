from .serializers import CustomerSerializer
from rest_framework import viewsets, generics, pagination, status
from rest_framework.views import Response
from rest_framework.authtoken.models import Token
from .models import Customer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from django.shortcuts import get_object_or_404

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

class CustomerPostView(generics.CreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication,]
    
    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
    
class CustomerUpdateView(generics.UpdateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    
    def perform_create(self, serializer):
        user = self.request.user

        if user.is_authenticated:
            serializer.save(usuario=user)

class CustomerDeleteView(generics.DestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    
    def get_object(self):
        self.object = get_object_or_404(Customer, pk=self.kwargs['pk'])
        return self.object
    
    def perform_create(self, serializer):
        user = self.request.user

        if user.is_authenticated:
            serializer.save(usuario=user)
