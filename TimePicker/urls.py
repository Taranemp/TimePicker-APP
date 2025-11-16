from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('students', views.StudentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('courses',views.CourseListCreateView.as_view(),name='course-list-create'),
    path('courses/<int:pk>',views.CourseDetailView.as_view(),name='course-detail'),
    path('slots/', views.CalendarSlotListCreateView.as_view(), name='slot-list'),
    path('slots/<int:pk>/', views.CalendarSlotDetailView.as_view(), name='slot-detail'),
]

