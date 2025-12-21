from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, StudentViewSet, ShowCourseCalendarApiView, RegisterStudentSlotApiView

router = DefaultRouter()
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'students', StudentViewSet, basename='student')


urlpatterns = [
   path('course/calendar/<course_id>', ShowCourseCalendarApiView.as_view(), name='show_calendar_api'),
   path('register-slot/', RegisterStudentSlotApiView.as_view(), name='register-slot-student_api'),
] + router.urls
