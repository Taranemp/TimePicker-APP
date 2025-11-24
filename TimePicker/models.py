from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Course(models.Model):
    
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.name

class CalendarSlot(models.Model):
    SLOT_CHOICES = [
        ('3-5', '3-5'),
        ('5-7', '5-7'),
        ('7-9', '7-9'),
    ]

    day = models.CharField(max_length=20)
    course = models.ForeignKey(
        Course,
        related_name='calendar_slots',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    slot_time = models.CharField(max_length=5, choices=SLOT_CHOICES)
    empty = models.BooleanField(default=True)
    count_student = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"{self.day} ({self.slot_time})"



class StudentChoice(models.Model):
    calendar_slot = models.ForeignKey(CalendarSlot, related_name='student_picks', on_delete=models.CASCADE)
    student = models.ForeignKey(Student, related_name='student_picks', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.student.name} ({self.calendar_slot.course})"