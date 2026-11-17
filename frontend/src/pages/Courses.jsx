import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Courses() {

    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    function loadCourses() {

        axios.get("http://127.0.0.1:8000/api/courses/")
            .then(function (response) {
                setCourses(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(function () {
        loadCourses();
    }, []);

    function startLearning(course) {

        navigate("/course-learning", {
            state: {
                course: course
            }
        });
    }

    return (
        <div className="dashboard">

            <div className="dashboard-header">

                <div>
                    <p className="small-title">
                        STUDENT LEARNING
                    </p>

                    <h1>
                        My Courses 📚
                    </h1>

                    <p>
                        Continue your learning journey with EduAI.
                    </p>
                </div>

                <div className="header-icon">
                    🤖
                </div>

            </div>


            <div className="stats">

                <div className="new-stat purple-stat">

                    <span className="new-stat-icon">
                        📚
                    </span>

                    <div>
                        <p>Total Courses</p>
                        <h2>{courses.length}</h2>
                    </div>

                </div>

            </div>


            <div className="courses-grid">

                {courses.map(function (course) {

                    return (

                        <div
                            className="modern-card course-card"
                            key={course.id}
                        >

                            <div className="card-title">

                                <div>
                                    <p className="small-title">
                                        COURSE
                                    </p>

                                    <h2>
                                        {course.name}
                                    </h2>
                                </div>

                                <span className="round-icon">
                                    📖
                                </span>

                            </div>

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


                            <button
                                className="primary-button"
                                onClick={() =>
                                    startLearning(course)
                                }
                            >
                                {course.progress === 100
                                    ? "✓ Completed"
                                    : "Continue Learning →"}
                            </button>

                        </div>

                    );

                })}

            </div>

        </div>
    );
}

export default Courses;