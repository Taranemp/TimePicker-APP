from django.contrib import admin
from .models import Course, CalendarSlot, StudentChoice, Student


class StudentChoiceInlineForStudent(admin.TabularInline):
    model = StudentChoice
    extra = 0
    readonly_fields = ("calendar_slot", "get_course")

    def get_course(self, obj):
        return obj.calendar_slot.course
    get_course.short_description = "Course"

    
    def has_add_permission(self, request, obj=None):

        if obj is None:  
            return False
        return True

    def has_change_permission(self, request, obj=None):
        return True


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "phone")
    list_display_links = ("name",)   
    search_fields = ("name", "phone")
    inlines = [StudentChoiceInlineForStudent]

    def get_inline_instances(self, request, obj=None):
        if obj is None:
            return []
        return super().get_inline_instances(request, obj)

class StudentPickInlineForCalendarSlot(admin.TabularInline):
    model = StudentChoice
    extra = 0
    readonly_fields = ("student", "get_phone")

    def get_phone(self, obj):
        return obj.student.phone
    get_phone.short_description = "Phone"

    def has_add_permission(self, request, obj=None):
        
        return False

    def has_change_permission(self, request, obj=None):
        
        return False

    def has_delete_permission(self, request, obj=None):
        
        return False

@admin.register(CalendarSlot)
class CalendarSlotAdmin(admin.ModelAdmin):
    list_display = ("id", "course", "day", "slot_time", "empty", "count_student")
    list_display_links = ("id",) 
    inlines = [StudentChoiceInlineForStudent]




@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_at", "updated_at")
    search_fields = ("name",)
    ordering = ("-created_at",)


@admin.register(StudentChoice)
class StudenChoicekAdmin(admin.ModelAdmin):
    list_display = ("id", "student", "calendar_slot", "created_at")
    list_filter = ("calendar_slot__day", "calendar_slot__course")
    search_fields = ("student__name",)
    ordering = ("-created_at",)