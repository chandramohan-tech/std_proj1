import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TeacherLayout from "./components/TeacherLayout";

import Dashboard from "./pages/Dashboard";
import AITutor from "./pages/AITutor";
import Courses from "./pages/Courses";
import Quizzes from "./pages/Quizzes";
import SupportTickets from "./pages/SupportTickets";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherStudents from "./pages/TeacherStudents";
import TeacherCourses from "./pages/TeacherCourses";
import TeacherTickets from "./pages/TeacherTickets";
import TeacherQuizzes from "./pages/TeacherQuizzes";
import TeacherLogin from "./pages/TeacherLogin";
import CourseLearning from "./pages/CourseLearning";
import TeacherRegister from "./pages/TeacherRegister";


function ProtectedRoute({ children }) {

    const studentId = localStorage.getItem("student_id");

    if (!studentId) {
        return <Navigate to="/login" />;
    }

    return children;
}


function TeacherProtectedRoute({ children }) {

    const teacherId = localStorage.getItem("teacher_id");

    if (!teacherId) {
        return <Navigate to="/teacher-login" />;
    }

    return children;
}


function StudentLayout({ children }) {

    return (
        <div className="app">

            <Sidebar />

            <div className="main">

                <Navbar />

                <div className="page">
                    {children}
                </div>

                <Footer />

            </div>

        </div>
    );
}


function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/teacher-login"
                    element={<TeacherLogin />}
                />

                <Route
                    path="/teacher-register"
                    element={<TeacherRegister />}
                />


                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <StudentLayout>
                                <Dashboard />
                            </StudentLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/ai-tutor"
                    element={
                        <ProtectedRoute>
                            <StudentLayout>
                                <AITutor />
                            </StudentLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/courses"
                    element={
                        <ProtectedRoute>
                            <StudentLayout>
                                <Courses />
                            </StudentLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/quizzes"
                    element={
                        <ProtectedRoute>
                            <StudentLayout>
                                <Quizzes />
                            </StudentLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/support"
                    element={
                        <ProtectedRoute>
                            <StudentLayout>
                                <SupportTickets />
                            </StudentLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/resources"
                    element={
                        <ProtectedRoute>
                            <StudentLayout>
                                <Resources />
                            </StudentLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <StudentLayout>
                                <Settings />
                            </StudentLayout>
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/teacher-dashboard"
                    element={
                        <TeacherProtectedRoute>
                            <TeacherLayout>
                                <TeacherDashboard />
                            </TeacherLayout>
                        </TeacherProtectedRoute>
                    }
                />

                <Route
                    path="/teacher-students"
                    element={
                        <TeacherProtectedRoute>
                            <TeacherLayout>
                                <TeacherStudents />
                            </TeacherLayout>
                        </TeacherProtectedRoute>
                    }
                />

                <Route
                    path="/teacher-courses"
                    element={
                        <TeacherProtectedRoute>
                            <TeacherLayout>
                                <TeacherCourses />
                            </TeacherLayout>
                        </TeacherProtectedRoute>
                    }
                />

                <Route
                    path="/teacher-tickets"
                    element={
                        <TeacherProtectedRoute>
                            <TeacherLayout>
                                <TeacherTickets />
                            </TeacherLayout>
                        </TeacherProtectedRoute>
                    }
                />

                <Route
                    path="/teacher-quizzes"
                    element={
                        <TeacherProtectedRoute>
                            <TeacherLayout>
                                <TeacherQuizzes />
                            </TeacherLayout>
                        </TeacherProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/login" />}
                />

                <Route
                    path="/course-learning"
                    element={
                 <ProtectedRoute>
                 <StudentLayout>
                 <CourseLearning />
                 </StudentLayout>
                 </ProtectedRoute>
                 }
                 />

            </Routes>

        </BrowserRouter>
    );
}

export default App;