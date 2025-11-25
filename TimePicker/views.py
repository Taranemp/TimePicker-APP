from rest_framework import viewsets
from .models import Student,Course,CalendarSlot,StudentChoice
from .serializers import StudentSerializer,CourseSerializer,CalendarSlotSerializer,RegisterSlotSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status, views
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404



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
    

class SelectStudentSlotApiView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSlotSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        slot_id = serializer.validated_data["calendar_slot"]
        student_id = serializer.validated_data["student"]

        slot = get_object_or_404(CalendarSlot, id=slot_id)
        student = get_object_or_404(Student, id=student_id)

        if not slot.status:
            return Response({"message": "Slot is not available"}, status=400)

        if StudentChoice.objects.filter(calendar_slot=slot, student=student).exists():
            return Response({"message": "Student has already chosen this slot"}, status=400)

        choice = StudentChoice.objects.create(calendar_slot=slot, student=student)

        slot.count = slot.student_choices.count()
        slot.save()

        return Response({
            "message": "Student successfully registered",
            "choice_id": choice.id,
            "slot_count": slot.count,
        }, status=201)
        
        
class DeselectStudentChoiceApiView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSlotSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        slot_id = serializer.validated_data['calendar_slot']
        student_id = serializer.validated_data['student']

        slot = get_object_or_404(CalendarSlot, id=slot_id)
        student = get_object_or_404(Student, id=student_id)

        choice = StudentChoice.objects.filter(calendar_slot=slot, student=student).first()

        if not choice:
            return Response({"message": "Student is not registered in this slot"},
                            status=status.HTTP_400_BAD_REQUEST)

        choice_id = choice.id
        choice.delete()

        slot.count = slot.student_choices.count()
        slot.save()

        return Response({"success": True, "removed_choice_id": choice_id}, status=status.HTTP_200_OK)

class ActivateSlotApiView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, slot_id=None):
        slot_id = slot_id or request.data.get("slot_id")
        if not slot_id:
            return Response({"ok": False, "error": "slot_id is required"},
                            status=status.HTTP_400_BAD_REQUEST)

        slot = get_object_or_404(CalendarSlot, id=slot_id)
        slot.status = True
        slot.save(update_fields=["status", "updated_at"])

        return Response(
            {"ok": True, "message": "Slot activated", "slot": CalendarSlotSerializer(slot).data},
            status=status.HTTP_200_OK
        )

class DeactivateSlotApiView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, slot_id=None):
        slot_id = slot_id or request.data.get("slot_id")
        if not slot_id:
            return Response({"ok": False, "error": "slot_id is required"},
                            status=status.HTTP_400_BAD_REQUEST)

        slot = get_object_or_404(CalendarSlot, id=slot_id)
        slot.status = False
        slot.save(update_fields=["status", "updated_at"])

        return Response(
            {"ok": True, "message": "Slot deactivated", "slot": CalendarSlotSerializer(slot).data},
            status=status.HTTP_200_OK
        )
