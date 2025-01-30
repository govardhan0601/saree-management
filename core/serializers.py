from rest_framework import serializers
from .models import Saree, RawMaterial, Transaction

class SareeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Saree
        fields = '__all__'

class RawMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = RawMaterial
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'