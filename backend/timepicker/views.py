from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from .models import Course, CalendarSlot, StudentPick, Student
from .serializers import CourseSerializer, CalendarSlotSerializer, StudentSerializer, StudentPickSerializer, RegisterSlotSerializer
from django.shortcuts import get_object_or_404

DAYS = ["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday"]
TIMES = ["3-5", "5-7", "7-9"]

class StudentViewSet(viewsets.ModelViewSet):
    """
    Student endpoints: list, create, retrieve, update, destroy
    """
    permission_classes = [AllowAny]
    queryset = Student.objects.all().order_by('-created_at')
    serializer_class = StudentSerializer

    def destroy(self, request, *args, **kwargs):
        student = self.get_object()
        student.delete()
        return Response({"ok": True, "message": "Student deleted successfully"}, status=status.HTTP_200_OK)

class CourseViewSet(viewsets.ModelViewSet):
    """
    Course endpoints: list, create, retrieve, update, destroy
    When creating a Course, default 7x3 CalendarSlot rows are created automatically.
    """
    permission_classes = [AllowAny]
    queryset = Course.objects.all().order_by('-created_at')
    serializer_class = CourseSerializer

    def perform_create(self, serializer):
        course = serializer.save()
        # Create 7x3 calendar slots automatically
        slots = [
            CalendarSlot(course=course, day=day, time=time, status=True, count=0)
            for day in DAYS for time in TIMES
        ]
        CalendarSlot.objects.bulk_create(slots)

    @action(detail=True, methods=['post'])
    def reset_calendar(self, request, pk=None):
        """
        Reset the calendar for a course (clear picks, reset counts, set status True).
        POST /api/courses/{id}/reset_calendar/
        """
        course = self.get_object()
        # delete all related student picks
        StudentPick.objects.filter(calendar_slot__course=course).delete()
        # reset slots
        slots = CalendarSlot.objects.filter(course=course)
        slots.update(status=True, count=0)
        return Response({'ok': True})

class ShowCourseCalendarApiView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, course_id):
        course = get_object_or_404(Course, id=course_id)
        course_serializer = CourseSerializer(course)

        day_order = ['saturday','sunday','monday','tuesday','wednesday','thursday','friday']
        slots = CalendarSlot.objects.filter(course=course)
        slots = sorted(slots, key=lambda s: (day_order.index(s.day), s.time))

        slots_serializer = CalendarSlotSerializer(slots, many=True)
        response_data = course_serializer.data
        response_data['calendar_slots'] = slots_serializer.data
        return Response(response_data, status=200)

class RegisterStudentSlotApiView(APIView):
    """
    Register a student in a calendar slot:
    POST /api/register-slot/
    Body: { "calendar_slot": slot_id, "student_id": student_id }
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSlotSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        slot_id = serializer.validated_data['calendar_slot']
        student_id = serializer.validated_data['student']

        slot = get_object_or_404(CalendarSlot, id=slot_id)
        student = get_object_or_404(Student, id=student_id)

        # بررسی فعال بودن slot
        if not slot.status:
            return Response({"error": "Slot is not available"}, status=status.HTTP_400_BAD_REQUEST)

        # جلوگیری از ثبت تکراری
        if StudentPick.objects.filter(calendar_slot=slot, student=student).exists():
            return Response({"error": "Student already registered for this slot"},
                            status=status.HTTP_400_BAD_REQUEST)

        # ثبت pick
        pick = StudentPick.objects.create(calendar_slot=slot, student=student)
        slot.count = slot.student_picks.count()
        slot.save()

        return Response({"success": True, "pick_id": pick.id}, status=status.HTTP_201_CREATED)