from rest_framework import viewsets
from .models import Saree, RawMaterial, Transaction
from .serializers import SareeSerializer, RawMaterialSerializer, TransactionSerializer

class SareeViewSet(viewsets.ModelViewSet):
    queryset = Saree.objects.all()
    serializer_class = SareeSerializer

class RawMaterialViewSet(viewsets.ModelViewSet):
    queryset = RawMaterial.objects.all()
    serializer_class = RawMaterialSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer