from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SareeViewSet, RawMaterialViewSet, TransactionViewSet

router = DefaultRouter()
router.register(r'sarees', SareeViewSet)
router.register(r'raw-materials', RawMaterialViewSet)
router.register(r'transactions', TransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Include API routes
]