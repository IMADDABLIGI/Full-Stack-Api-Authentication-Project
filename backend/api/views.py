from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

# Create your views here.

# this is a based class view that will allows us to implement creating a new user or like a registration form
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all        # Specifie a list of all the different object that will be looking at when creating a new one to make sure not to create a user that already exsiste
    serializer_class = UserSerializer  # Tell this view what kind of data we need to accept a new user {username and a password}
    permission_classes = [AllowAny]    # Specifie who can actually call to use this view even if not authenticated to create a new user

from rest_framework import viewsets
from .models import Note
from .serializers import NoteSerializer
from rest_framework import status

class NoteListCreateView(generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    # Overrighting the create function just to return a response
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response("Note is saved", status=status.HTTP_201_CREATED)






# class NoteListCreateView(viewsets.ModelViewSet):
#     queryset = Note.objects.all()
#     serializer_class = NoteSerializer
#     permission_classes = [IsAuthenticated]
    # Response("Note is being saved ")

