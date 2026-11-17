import { useEffect, useState } from "react";
import axios from "axios";

function TeacherCourses() {

    const [courses, setCourses] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [courseMessage, setCourseMessage] = useState("");
    const [courseSuccess, setCourseSuccess] = useState("");

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

    function addCourse() {

        if (name.trim() === "" || description.trim() === "") {
            setCourseMessage("Please fill in both the course name and description.");
            return;
        }

        setCourseMessage("");
        setCourseSuccess("");

        axios.post(
            "http://127.0.0.1:8000/api/courses/",
            {
                name: name,
                description: description,
                progress: 0
            }
        )
        .then(function () {

            setName("");
            setDescription("");
            setCourseSuccess("Course added successfully!");

            loadCourses();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className="dashboard">

            <div className="dashboard-header">

                <div>
                    <p className="small-title">
                        COURSE MANAGEMENT
                    </p>

                    <h1>📚 Courses</h1>

                    <p>
                        Create and manage learning courses.
                    </p>
                </div>

                <div className="header-icon">
                    
                </div>

            </div>


            <div className="modern-card">

                <div className="card-title">

                    <div>
                        <p className="small-title">
                            CREATE COURSE
                        </p>

                        <h2>
                            Add New Course
                        </h2>
                    </div>

                    <span className="round-icon">
                        ➕
                    </span>

                </div>


                <input
                    type="text"
                    className="teacher-course-input"
                    placeholder="Course name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    className="teacher-course-input"
                    placeholder="Course description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button
                    className="primary-button"
                    onClick={addCourse}
                >
                    Add Course →
                </button>

                {courseMessage && (
                    <p className="validation-message">
                        {courseMessage}
                    </p>
                )}

                {courseSuccess && (
                    <p className="success-message">
                        {courseSuccess}
                    </p>
                )}

            </div>


            <div className="modern-card quick-card">

                <p className="small-title">
                    AVAILABLE COURSES
                </p>

                <h2>
                    Course List
                </h2>


                <div className="teacher-courses-grid">

                    {courses.map(function (course) {

                        return (
                            <div
                                className="settings teacher-course-card"
                                key={course.id}
                            >

                                <h3>
                                    📖 {course.name}
                                </h3>

                                <p>
                                    {course.description}
                                </p>

                                <p>
                                    Progress: {course.progress}%
                                </p>

                            </div>
                        );

                    })}

                </div>

            </div>

        </div>
    );
}

export default TeacherCourses;