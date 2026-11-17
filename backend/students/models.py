from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class SupportTicket(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    problem = models.TextField()
    response = models.TextField(default="")
    status = models.CharField(max_length=20, default="Open")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Ticket #{self.id}"


class Course(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    progress = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class QuizResult(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    score = models.IntegerField()
    total = models.IntegerField(default=3)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.name} - {self.score}/{self.total}"



class Teacher(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.name