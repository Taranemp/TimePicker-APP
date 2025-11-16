from rest_framework import viewsets
from .models import Student,Course,CalendarSlot
from .serializers import StudentSerializer,CourseSerializer,CalendarSlotSerializer
from rest_framework import generics


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    
    http_method_names = ['get', 'post']
    

    
class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    
class CourseDetailView(generics.RetrieveDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    
class CalendarSlotListCreateView(generics.ListCreateAPIView):
    queryset = CalendarSlot.objects.all()
    serializer_class = CalendarSlotSerializer
    
class CalendarSlotDetailView(generics.RetrieveDestroyAPIView):
    queryset = CalendarSlot.objects.all()
    serializer_class = CalendarSlotSerializer
    