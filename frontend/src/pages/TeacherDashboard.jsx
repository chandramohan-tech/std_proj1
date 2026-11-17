import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function TeacherDashboard() {

    const [data, setData] = useState(null);

    const name = localStorage.getItem("teacher_name");

    useEffect(function () {

        axios.get("http://127.0.0.1:8000/api/teacher-dashboard/")
            .then(function (response) {
                setData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    return (
        <div className="dashboard">

            <div className="dashboard-header">

                <div>
                    <p className="small-title">
                        TEACHER DASHBOARD
                    </p>

                    <h1>
                        Welcome back, {name} 👋
                    </h1>

                    <p>
                        Manage students, courses and learning activities.
                    </p>
                </div>

                <div className="header-icon">
                    👨‍🏫
                </div>

            </div>


            {data && (

                <div className="stats">

                    <div className="new-stat purple-stat">

                        <span className="new-stat-icon">
                            👨‍🎓
                        </span>

                        <div>
                            <p>Students</p>
                            <h2>{data.students}</h2>
                        </div>

                    </div>


                    <div className="new-stat green-stat">

                        <span className="new-stat-icon">
                            📚
                        </span>

                        <div>
                            <p>Courses</p>
                            <h2>{data.courses}</h2>
                        </div>

                    </div>


                    <div className="new-stat orange-stat">

                        <span className="new-stat-icon">
                            🎫
                        </span>

                        <div>
                            <p>Support Tickets</p>
                            <h2>{data.support_tickets}</h2>
                        </div>

                    </div>


                    <div className="new-stat blue-stat">

                        <span className="new-stat-icon">
                            📝
                        </span>

                        <div>
                            <p>Quiz Results</p>
                            <h2>{data.quiz_results}</h2>
                        </div>

                    </div>

                </div>

            )}


            <div className="dashboard-columns">

                <div className="modern-card">

                    <div className="card-title">

                        <div>
                            <p className="small-title">
                                STUDENT MANAGEMENT
                            </p>

                            <h2>Manage Students</h2>
                        </div>

                        <span className="round-icon">
                            👨‍🎓
                        </span>

                    </div>

                    <p>
                        View and manage all registered students.
                    </p>

                    <Link to="/teacher-students">

                        <button className="primary-button">
                            View Students →
                        </button>

                    </Link>

                </div>


                <div className="modern-ai-card">

                    <div className="ai-top">

                        <span className="ai-round">
                            📚
                        </span>

                        <span className="ai-label">
                            COURSE MANAGEMENT
                        </span>

                    </div>

                    <h2>Manage Courses</h2>

                    <p>
                        Create and manage courses for your students.
                    </p>

                    <Link to="/teacher-courses">

                        <button className="ai-button">
                            Manage Courses →
                        </button>

                    </Link>

                </div>

            </div>


            <div className="modern-card quick-card">

                <p className="small-title">
                    QUICK ACCESS
                </p>

                <h2>
                    What would you like to manage?
                </h2>

                <div className="quick-buttons">

                    <Link to="/teacher-students">
                        <button>
                            👨‍🎓 Students
                        </button>
                    </Link>

                    <Link to="/teacher-courses">
                        <button>
                            📚 Courses
                        </button>
                    </Link>

                    <Link to="/teacher-tickets">
                        <button>
                            🎫 Support Tickets
                        </button>
                    </Link>

                    <Link to="/teacher-quizzes">
                        <button>
                            📝 Quiz Results
                        </button>
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default TeacherDashboard;