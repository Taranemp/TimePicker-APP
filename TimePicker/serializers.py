from rest_framework import serializers
from .models import Student, Course, CalendarSlot


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class CalendarSlotSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CalendarSlot
        fields =['id', 'day', 'slot_time', 'empty']


class CourseSerializer(serializers.ModelSerializer):
    calendar_slots = CalendarSlotSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ["id", "name", "created_at", "updated_at", "calendar_slots"]

        
        

    
