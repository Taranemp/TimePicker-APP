from django.contrib import admin
from .models import Student, Course, CalendarSlot

admin.site.register(Student)
admin.site.register(Course)
admin.site.register(CalendarSlot)

