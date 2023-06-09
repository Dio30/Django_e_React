from rest_framework.routers import SimpleRouter
from . import views
from django.urls import path

router = SimpleRouter()

router.register('customers', views.CustomerList) # o que vai ser manipulado no DRF

urlpatterns = [
    path('customer_list/', views.CustomerListView.as_view(), name='customer_list'), # o que vai ser renderizado no react.js
    path('customer_new/', views.CustomerPostView.as_view(), name='customer_new'),
    path('customer_edit/<int:pk>/', views.CustomerUpdateView.as_view(), name='customer_edit'),
    path('customer_delete/<int:pk>/', views.CustomerDeleteView.as_view(), name='customer_delete'),
]