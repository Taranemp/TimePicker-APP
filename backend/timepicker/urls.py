from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, CalendarSlotViewSet, StudentPickViewSet, StudentViewSet, ShowCourseCalendarApiView

router = DefaultRouter()
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'slots', CalendarSlotViewSet, basename='slot')
router.register(r'picks', StudentPickViewSet, basename='pick')
router.register(r'students', StudentViewSet, basename='student')


urlpatterns = [
   path('course/calendar/<course_id>', ShowCourseCalendarApiView.as_view(), name='show_calendar'),
] + router.urls
