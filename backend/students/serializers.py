from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from .models import (
    Student,
    Teacher,
    SupportTicket,
    Course,
    QuizResult
)


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = "__all__"

    def create(self, validated_data):
        validated_data["password"] = make_password(
            validated_data["password"]
        )
        return Student.objects.create(**validated_data)


class TeacherSerializer(serializers.ModelSerializer):

    class Meta:
        model = Teacher
        fields = "__all__"

    def create(self, validated_data):
        validated_data["password"] = make_password(
            validated_data["password"]
        )
        return Teacher.objects.create(**validated_data)


class SupportTicketSerializer(serializers.ModelSerializer):

    class Meta:
        model = SupportTicket
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = "__all__"


class QuizResultSerializer(serializers.ModelSerializer):

    class Meta:
        model = QuizResult
        fields = "__all__"