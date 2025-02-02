from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views import SareeViewSet, RawMaterialViewSet, TransactionViewSet

# ✅ Use Django REST Framework's router for API endpoints
router = DefaultRouter()
router.register(r'sarees', SareeViewSet)
router.register(r'raw-materials', RawMaterialViewSet)
router.register(r'transactions', TransactionViewSet)

urlpatterns = [
    path('api/', include(router.urls)),  # ✅ Ensure this line exists
]