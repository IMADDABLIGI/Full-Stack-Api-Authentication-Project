from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# router = DefaultRouter()
# router.register(r'notes', views.NoteViewSet)

# urlpatterns = [
#     path('', include(router.urls)),
# ]

urlpatterns = [
    path('notes/', views.NoteListCreateView.as_view(), name='note-list-create'),
]