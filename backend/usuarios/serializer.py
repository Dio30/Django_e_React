from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

UserModel = get_user_model()
        
class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['id','username', 'password']
        
    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(username=clean_data['username'], 
                                            password=clean_data['password'])
        
        user_obj.save()
        return user_obj

class UserLoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    class Meta:
        model = UserModel
        fields = ['username', 'password']
        extra_kwargs = {'password':{
            'write_only':True,
            'required':True
        }}
    
    def check_user(self, clean_data):
        user = authenticate(username=clean_data['username'], 
                            password=clean_data['password'])
        return user