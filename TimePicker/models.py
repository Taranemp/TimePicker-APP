from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)

    def __str__(self):
        return self.name


class CalendarSlot(models.Model):
    SLOT_CHOICES = [
        ('3-5', '3-5'),
        ('5-7', '5-7'),
        ('7-9', '7-9'),
    ]

    day = models.CharField(max_length=20)
    slot_time = models.CharField(max_length=5, choices=SLOT_CHOICES)
    empty = models.BooleanField(default=True)
    count_student = models.IntegerField(default=0)
    students = models.ManyToManyField(Student, related_name='calendar_slots')

    def __str__(self):
        return f"{self.day} ({self.slot_time})"


class Course(models.Model):
    name = models.CharField(max_length=100)
    calendar_slot = models.ForeignKey(CalendarSlot, on_delete=models.CASCADE, related_name='courses')

    def __str__(self):
        return self.name

