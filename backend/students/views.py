from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password

from .models import Student, Teacher, SupportTicket, Course, QuizResult

from .serializers import (
    StudentSerializer,
    TeacherSerializer,
    SupportTicketSerializer,
    CourseSerializer,
    QuizResultSerializer
)

from .ai import get_ai_answer


@api_view(["GET", "POST"])
def get_students(request):

    if request.method == "GET":

        students = Student.objects.all()

        serializer = StudentSerializer(students, many=True)

        return Response(serializer.data)

    if request.method == "POST":

        serializer = StudentSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors)


    from django.contrib.auth.hashers import check_password


@api_view(["POST"])
def login_student(request):

    email = request.data.get("email")
    password = request.data.get("password")

    try:
        student = Student.objects.get(email=email)
    except Student.DoesNotExist:
        return Response({"message": "Invalid email or password"}, status=401)

    if check_password(password, student.password):
        return Response({
            "message": "Login successful",
            "student_id": student.id,
            "name": student.name,
            "email": student.email
        })

    return Response({"message": "Invalid email or password"}, status=401)


@api_view(["POST"])
def ai_tutor(request):

    question = request.data.get("question", "").strip()

    if question == "":
        return Response({
            "answer": "Please enter a question."
        })

    answer = get_ai_answer(question)

    return Response({
        "question": question,
        "answer": answer
    })


@api_view(["GET", "POST"])
def support_tickets(request):

    if request.method == "GET":

        tickets = SupportTicket.objects.all()

        serializer = SupportTicketSerializer(
            tickets,
            many=True
        )

        return Response(serializer.data)

    if request.method == "POST":

        serializer = SupportTicketSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors)

@api_view(["GET", "POST"])
def courses(request):

    if request.method == "GET":

        courses = Course.objects.all()

        serializer = CourseSerializer(
            courses,
            many=True
        )

        return Response(serializer.data)

    if request.method == "POST":

        serializer = CourseSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors)

@api_view(["GET", "POST"])
def quiz_results(request):

    if request.method == "GET":

        results = QuizResult.objects.all()

        serializer = QuizResultSerializer(
            results,
            many=True
        )

        return Response(serializer.data)

    if request.method == "POST":

        serializer = QuizResultSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors)


@api_view(["GET"])
def student_profile(request, student_id):

    try:
        student = Student.objects.get(id=student_id)

        return Response({
            "id": student.id,
            "name": student.name,
            "email": student.email
        })

    except Student.DoesNotExist:

        return Response(
            {"message": "Student not found"},
            status=404
        )


@api_view(["GET", "POST"])
def teachers(request):

    if request.method == "GET":

        teachers = Teacher.objects.all()

        serializer = TeacherSerializer(
            teachers,
            many=True
        )

        return Response(serializer.data)

    if request.method == "POST":

        serializer = TeacherSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors)



@api_view(["POST"])
def teacher_login(request):

    email = request.data.get("email", "").strip().lower()
    password = request.data.get("password", "")

    teachers = Teacher.objects.filter(email__iexact=email)

    for teacher in teachers:

        if check_password(password, teacher.password):

            return Response({
                "message": "Teacher login successful",
                "teacher_id": teacher.id,
                "name": teacher.name,
                "email": teacher.email
            })

    return Response(
        {"message": "Invalid email or password"},
        status=401
    )

@api_view(["GET"])
def teacher_dashboard(request):

    students = Student.objects.count()
    courses_count = Course.objects.count()
    tickets = SupportTicket.objects.count()
    quizzes = QuizResult.objects.count()

    return Response({
        "students": students,
        "courses": courses_count,
        "support_tickets": tickets,
        "quiz_results": quizzes
    })

@api_view(["PUT"])
def respond_ticket(request, ticket_id):

    try:
        ticket = SupportTicket.objects.get(id=ticket_id)

        response_text = request.data.get("response", "")

        ticket.response = response_text
        ticket.status = "Answered"
        ticket.save()

        return Response({
            "message": "Response added successfully",
            "ticket_id": ticket.id,
            "response": ticket.response,
            "status": ticket.status
        })

    except SupportTicket.DoesNotExist:

        return Response(
            {"message": "Ticket not found"},
            status=404
        )

@api_view(["PUT"])
def update_course_progress(request, course_id):

    try:
        course = Course.objects.get(id=course_id)

        progress = request.data.get("progress", course.progress)

        course.progress = int(progress)
        course.save()

        return Response({
            "message": "Course progress updated successfully",
            "course_id": course.id,
            "progress": course.progress
        })

    except Course.DoesNotExist:
        return Response(
            {"message": "Course not found"},
            status=404
        )