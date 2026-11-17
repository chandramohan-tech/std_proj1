import { Link, useLocation } from "react-router-dom";

function TeacherSidebar() {

    const location = useLocation();

    function active(path) {
        return location.pathname === path
            ? "sidebar-link active"
            : "sidebar-link";
    }

    return (
        <div className="sidebar">

            <Link to="/teacher-dashboard" className="logo">
                <span className="logo-icon">🎓</span>
                <span className="logo-text">EduAI</span>
            </Link>

            <nav>

                <Link
                    className={active("/teacher-dashboard")}
                    to="/teacher-dashboard"
                >
                    🏠 <span>Dashboard</span>
                </Link>

                <Link
                    className={active("/teacher-students")}
                    to="/teacher-students"
                >
                    👨‍🎓 <span>Students</span>
                </Link>

                <Link
                    className={active("/teacher-courses")}
                    to="/teacher-courses"
                >
                    📚 <span>Courses</span>
                </Link>

                <Link
                    className={active("/teacher-tickets")}
                    to="/teacher-tickets"
                >
                    🎫 <span>Support Tickets</span>
                </Link>

                <Link
                    className={active("/teacher-quizzes")}
                    to="/teacher-quizzes"
                >
                    📝 <span>Quiz Results</span>
                </Link>

            </nav>

            <div className="sidebar-bottom">

                <div>👨‍🏫</div>

                <p>
                    Teach<br />
                    Guide<br />
                    Inspire
                </p>

            </div>

        </div>
    );
}

export default TeacherSidebar;