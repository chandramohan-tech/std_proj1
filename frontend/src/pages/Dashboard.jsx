import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    
} from "recharts";

function Dashboard() {

    const name = localStorage.getItem("student_name");
    const studentId = localStorage.getItem("student_id");

    const [courses, setCourses] = useState([]);
    const [results, setResults] = useState([]);
    const [tickets, setTickets] = useState([]);

    useEffect(function () {

        axios.get("http://127.0.0.1:8000/api/courses/")
            .then(function (response) {
                setCourses(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get("http://127.0.0.1:8000/api/quiz-results/")
            .then(function (response) {

                const myResults = response.data.filter(function (result) {
                    return String(result.student) === String(studentId);
                });

                setResults(myResults);

            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get("http://127.0.0.1:8000/api/support-tickets/")
            .then(function (response) {

                const myTickets = response.data.filter(function (ticket) {
                    return String(ticket.student) === String(studentId);
                });

                setTickets(myTickets);

            })
            .catch(function (error) {
                console.log(error);
            });

    }, [studentId]);

    


    const totalCourses = courses.length;

    const totalQuizzes = results.length;

    const averageScore = totalQuizzes > 0
        ? Math.round(
            results.reduce(function (total, result) {
                return total + (result.score / result.total) * 100;
            }, 0) / totalQuizzes
        )
        : 0;

    const openTickets = tickets.filter(function (ticket) {
        return ticket.status === "Open";
    }).length;

    const courseProgressData = courses.map(function (course) {
        return {
            name: course.name,
            progress: Number(course.progress) || 0
        };
    });

    const averageCourseProgress = courseProgressData.length > 0
        ? Math.round(
            courseProgressData.reduce(function (total, course) {
                return total + course.progress;
            }, 0) / courseProgressData.length
        )
        : 0;

    const chartColors = ["#4f46e5", "#0f766e", "#f97316", "#c13eea", "#0284c7",];


    return (
        <div className="dashboard">

            <div className="dashboard-header">

                <div>
                    <p className="small-title">
                        STUDENT DASHBOARD
                    </p>

                    <h1>
                        Welcome back, {name} 👋
                    </h1>

                    <p>
                        Continue your learning journey with EduAI.
                    </p>
                </div>

                <div className="header-icon">
                    🎓
                </div>

            </div>


            <div className="stats">

                <div className="new-stat purple-stat">

                    <span className="new-stat-icon">
                        📚
                    </span>

                    <div>
                        <p>My Courses</p>
                        <h2>{totalCourses}</h2>
                    </div>

                </div>


                <div className="new-stat green-stat">

                    <span className="new-stat-icon">
                        📝
                    </span>

                    <div>
                        <p>Quiz Attempts</p>
                        <h2>{totalQuizzes}</h2>
                    </div>

                </div>


                <div className="new-stat orange-stat">

                    <span className="new-stat-icon">
                        📈
                    </span>

                    <div>
                        <p>Average Score</p>
                        <h2>{averageScore}%</h2>
                    </div>

                </div>


                <div className="new-stat blue-stat">

                    <span className="new-stat-icon">
                        🎫
                    </span>

                    <div>
                        <p>Open Tickets</p>
                        <h2>{openTickets}</h2>
                    </div>

                </div>

            </div>


            <div className="dashboard-columns">

                <div className="modern-card">

                    <div className="card-title">

                        <div>
                            <p className="small-title">
                                YOUR COURSES
                            </p>

                            <h2>
                                Continue Learning
                            </h2>
                        </div>

                        <span className="round-icon">
                            📚
                        </span>

                    </div>


                    {courses.length === 0 ? (

                        <p>
                            No courses available.
                        </p>

                    ) : (

                        courses.slice(0, 3).map(function (course) {

                            return (

                                <div
                                    className="settings"
                                    key={course.id}
                                >

                                    <h3>
                                        📖 {course.name}
                                    </h3>

                                    <p>
                                        {course.description}
                                    </p>

                                    <div className="progress-info">

                                        <span>
                                            Progress
                                        </span>

                                        <strong>
                                            {course.progress}%
                                        </strong>

                                    </div>

                                    <div className="modern-progress">

                                        <div
                                            style={{
                                                width: `${course.progress}%`
                                            }}
                                        ></div>

                                    </div>

                                </div>

                            );

                        })

                    )}


                    <Link to="/courses">

                        <button className="primary-button">
                            View All Courses →
                        </button>

                    </Link>

                </div>


                <div className="dashboard-right-column">

                <div className="modern-card course-progress-card">

                    <p className="small-title">
                        COURSE PROGRESS
                    </p>

                    <h2>
                        Learning Overview
                    </h2>

                    {courseProgressData.length === 0 ? (

                        <p>
                            No course progress available.
                        </p>

                    ) : (

                        <>

                            <div className="course-progress-chart">

                                <div className="course-progress-center">
                                    <strong>{averageCourseProgress}%</strong>
                                    <span>completed</span>
                                </div>

                                <ResponsiveContainer width="100%" height={220}>

                                    <PieChart>

                                        <Pie
                                            data={courseProgressData}
                                            dataKey="progress"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            innerRadius="52%"
                                            outerRadius="76%"
                                            paddingAngle={4}
                                            cornerRadius={6}
                                            stroke="#ffffff"
                                            strokeWidth={3}
                                            
                                        >

                                            {courseProgressData.map(function (course, index) {
                                                return (
                                                    <Cell
                                                        key={`${course.name}-${index}`}
                                                        fill={chartColors[index % chartColors.length]}
                                                    />
                                                );
                                            })}

                                        </Pie>

                                        <Tooltip
                                            formatter={function (value) {
                                                return [`${value}%`, "Progress"];
                                            }}
                                        />

                                    </PieChart>

                                </ResponsiveContainer>

                            </div>

                            <div className="course-progress-list">













































































































































































































































































































































































































































































































































































































































































































































































































































































































555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
                                {courseProgressData.map(function (course, index) {
                                    return (
                                        <div key={`${course.name}-progress-${index}`}>
                                            <span className="course-progress-name">
                                                <i
                                                    style={{
                                                        backgroundColor: chartColors[index % chartColors.length]
                                                    }}
                                                ></i>
                                                {course.name}
                                            </span>
                                            <strong>{course.progress}%</strong>
                                        </div>
                                    );
                                })}

                            </div>

                        </>

                    )}

                </div>

                <div className="modern-ai-card">

                    <div className="ai-top">

                        <span className="ai-round">
                            🤖
                        </span>

                        <span className="ai-label">
                            AI POWERED
                        </span>

                    </div>

                    <h2>
                        AI Tutor
                    </h2>

                    <p>
                        Need help with a topic? Ask your personal
                        AI learning assistant.
                    </p>

                    <Link to="/ai-tutor">

                        <button className="ai-button">
                            Ask AI Tutor →
                        </button>

                    </Link>

                </div>

                </div>

            </div>


            <div className="modern-card">

                <p className="small-title">
                    YOUR PERFORMANCE
                </p>

                <h2>
                    Quiz Performance 🏆
                </h2>

                {totalQuizzes === 0 ? (

                    <p>
                        Take your first quiz to see your performance.
                    </p>

                ) : (

                    <>

                        <div className="progress-info">

                            <span>
                                Average Score
                            </span>

                            <strong>
                                {averageScore}%
                            </strong>

                        </div>

                        <div className="modern-progress">

                            <div
                                style={{
                                    width: `${averageScore}%`
                                }}
                            ></div>

                        </div>

                        <Link to="/quizzes">

                            <button className="primary-button">
                                Take Another Quiz →
                            </button>

                        </Link>

                    </>

                )}

            </div>


            <div className="modern-card quick-card">

                <p className="small-title">
                    QUICK ACCESS
                </p>

                <h2>
                    What would you like to do?
                </h2>

                <div className="quick-buttons">

                    <Link to="/courses">
                        <button>📚 Courses</button>
                    </Link>

                    <Link to="/quizzes">
                        <button>📝 Take Quiz</button>
                    </Link>

                    <Link to="/support">
                        <button>🎫 Support</button>
                    </Link>

                    <Link to="/resources">
                        <button>📖 Resources</button>
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;

