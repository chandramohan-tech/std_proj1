import { Link, useLocation } from "react-router-dom";

function Sidebar() {

    const location = useLocation();

    function active(path) {
        return location.pathname === path ? "sidebar-link active" : "sidebar-link";
    }

    return (
        <div className="sidebar">

            {/* <Link to="/" className="logo">
               🎓 <span>EduAI</span>
            </Link> */}

            <Link to="/" className="logo">
              <span className="logo-icon">🎓</span>
              <span className="logo-text">EduAI</span>
            </Link>

            <nav>

                <Link className={active("/")} to="/">
                    🏠 <span>Dashboard</span>
                </Link>

                <Link className={active("/ai-tutor")} to="/ai-tutor">
                    🤖 <span>AI Tutor</span>
                </Link>

                <Link className={active("/courses")} to="/courses">
                    📚 <span>My Courses</span>
                </Link>

                <Link className={active("/quizzes")} to="/quizzes">
                    📝 <span>Quizzes</span>
                </Link>

                <Link className={active("/support")} to="/support">
                    🎫 <span>Support Tickets</span>
                </Link>

                <Link className={active("/resources")} to="/resources">
                    📖 <span>Resources</span>
                </Link>

                <Link className={active("/settings")} to="/settings">
                    ⚙️ <span>Settings</span>
                </Link>

            </nav>

            <div className="sidebar-bottom">
                <div>🤖</div>
                <p>Learn<br />Grow<br />Achieve</p>
            </div>

        </div>
    );
}

export default Sidebar;