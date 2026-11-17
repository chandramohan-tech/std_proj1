from django.urls import path

from .views import (
    get_students,
    teachers,
    teacher_login,
    teacher_dashboard,
    login_student,
    ai_tutor,
    support_tickets,
    courses,
    quiz_results,
    student_profile,
    respond_ticket,
    update_course_progress
)

urlpatterns = [
    path("students/", get_students),
    path("teachers/", teachers),
    path("teacher-login/", teacher_login),
    path("login/", login_student),
    path("ai-tutor/", ai_tutor),
    path("support-tickets/", support_tickets),
    path("courses/", courses),
    path("quiz-results/", quiz_results),
    path("student-profile/<int:student_id>/", student_profile),
    path("teacher-dashboard/", teacher_dashboard),
    path("support-tickets/<int:ticket_id>/respond/", respond_ticket),
    path("courses/<int:course_id>/progress/", update_course_progress),
]