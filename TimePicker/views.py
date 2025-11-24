from rest_framework import viewsets
from .models import Student,Course,CalendarSlot
from .serializers import StudentSerializer,CourseSerializer,CalendarSlotSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status, views
from rest_framework.permissions import AllowAny, IsAdminUser



class StudentViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        if self.action == 'destroy':
            return [IsAdminUser()]   
        return [AllowAny()]
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    
    http_method_names = ['get', 'post']
    

    
class CourseListCreateView(generics.ListCreateAPIView):
    def get_permissions(self):
        if self.request.method == 'create':
            return [IsAdminUser()]
        return [AllowAny()] 
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    
class CourseDetailView(generics.RetrieveDestroyAPIView):
    def get_permissions(self):
        if self.request.method == 'DELETE':
            return [IsAdminUser()]
        return [AllowAny()]

    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    
class CalendarSlotListCreateView(generics.ListCreateAPIView):
    def get_permissions(self):
        if self.request.method == 'create':
            return [IsAdminUser()]
        return [AllowAny()] 
    queryset = CalendarSlot.objects.all()
    serializer_class = CalendarSlotSerializer
    
class CalendarSlotDetailView(generics.RetrieveDestroyAPIView):
    def get_permissions(self):
        if self.request.method == 'DELETE':
            return [IsAdminUser()]
        return [AllowAny()]

    queryset = CalendarSlot.objects.all()
    serializer_class = CalendarSlotSerializer
    


