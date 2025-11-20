from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from TimePicker.models import Course, CalendarSlot, Student


class Command(BaseCommand):
    help = "Seed database with demo data."

    def handle(self, *args, **options):

        # === Create Courses ===
        courses = [
            "Python",
            "Data Science",
            "Web Development",
            "Animation",
            "Game Development",
        ]

        course_objs = []
        for c in courses:
            obj, _ = Course.objects.get_or_create(name=c)
            course_objs.append(obj)
        self.stdout.write(self.style.SUCCESS("Courses created."))

        # === Create Calendar Slots ===
        days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        times = ["3-5", "5-7", "7-9"]

        for course in course_objs:
            for d in days:
                for t in times:
                    CalendarSlot.objects.get_or_create(
                        day=d,
                        slot_time=t,
                        empty=True,
                        count_student=0,
                    )
        self.stdout.write(self.style.SUCCESS("Calendar slots created."))

        # === Create Students ===
        students = ["Ali", "Sara", "Reza", "Zahra", "Mahsa", "Hossein"]

        for s in students:
            Student.objects.get_or_create(name=s, phone="00000000")

        self.stdout.write(self.style.SUCCESS("Students created."))

        self.stdout.write(self.style.SUCCESS("✔ Seed data inserted successfully!"))
