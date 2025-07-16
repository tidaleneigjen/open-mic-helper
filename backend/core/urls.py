from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from openmic.views import SongViewSet, SetViewSet

router = DefaultRouter()
router.register(r'songs', SongViewSet, basename='song')
router.register(r'sets', SetViewSet, basename='set')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),  # optional: browsable API login
]
