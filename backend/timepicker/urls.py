from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, StudentViewSet, ShowCourseCalendarApiView, RegisterStudentSlotApiView, ActivateSlotApiView, DeactivateSlotApiView

router = DefaultRouter()
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'students', StudentViewSet, basename='student')


urlpatterns = [
   path('course/calendar/<course_id>', ShowCourseCalendarApiView.as_view(), name='show_calendar-api'),
   path('register-slot/', RegisterStudentSlotApiView.as_view(), name='register-slot-student-api'),
   path('slots/<int:slot_id>/activate/', ActivateSlotApiView.as_view(), name='activate-slot-api'),
   path('slots/<int:slot_id>/deactivate/', DeactivateSlotApiView.as_view(), name='deactivate-slot-api'),
] + router.urls

