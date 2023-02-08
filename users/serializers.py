from rest_framework import serializers
from users.models import User
from djoser.serializers import UserCreateSerializer

class UserSerializer(UserCreateSerializer):

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('first_name','last_name','email','password',)