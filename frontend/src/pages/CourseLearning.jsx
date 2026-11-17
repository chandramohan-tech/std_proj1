import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function CourseLearning() {

    const location = useLocation();
    const navigate = useNavigate();

    const course = location.state?.course;

    const [selectedLesson, setSelectedLesson] = useState(null);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [certificateOpen, setCertificateOpen] = useState(false);
    const [courseProgress, setCourseProgress] = useState(course?.progress || 0);

    if (!course) {
        return (
            <div className="dashboard">
                <div className="modern-card">
                    <h1>Course not found</h1>

                    <button
                        className="primary-button"
                        onClick={() => navigate("/courses")}
                    >
                        ← Back to Courses
                    </button>
                </div>
            </div>
        );
    }

    const lessons = [
        {
            id: 1,
            title: "Introduction",
            description: `Learn the basic concepts of ${course.name}.`
        },
        {
            id: 2,
            title: "Fundamentals",
            description: "Learn the fundamental concepts and examples."
        },
        {
            id: 3,
            title: "Practical Examples",
            description: "Practice what you have learned."
        }
    ];

    const progress = courseProgress;

    function completeLesson(lessonId) {

        if (completedLessons.includes(lessonId)) {
            return;
        }

        const newCompletedLessons = [
            ...completedLessons,
            lessonId
        ];

        const newProgress = Math.min(
            progress + 20,
            100
        );

        axios.put(
            `http://127.0.0.1:8000/api/courses/${course.id}/progress/`,
            {
                progress: newProgress
            }
        )
        .then(function () {

            setCompletedLessons(newCompletedLessons);
            setCourseProgress(newProgress);
            setSelectedLesson(null);

            alert("Lesson completed!");

        })
        .catch(function (error) {

            console.log(error);
            alert("Unable to update progress.");

        });
    }

    return (
        <div className="dashboard">

            <div className="dashboard-header">

                <div>
                    <p className="small-title">
                        COURSE LEARNING
                    </p>

                    <h1>
                        📖 {course.name}
                    </h1>

                    <p>
                        {course.description}
                    </p>
                </div>

                <div className="header-icon">
                    🤖
                </div>

            </div>

{/* 
            <div className="modern-card">

                <p className="small-title">
                    COURSE PROGRESS
                </p>

                <h2>
                    {progress}% Completed
                </h2>

                <div className="progress-certificate-row">

                    <div className="modern-progress">
                        <div
                            style={{
                                width: `${progress}%`
                            }}
                        ></div>
                    </div>

                    <button
                        className="primary-button certificate-button"
                        disabled={progress < 100}
                        onClick={() => setCertificateOpen(true)}
                    >
                        Course Complete Certificate
                    </button>

                </div>

            </div>


            {certificateOpen && (

                <div className="certificate-overlay">

                    <div
                        className="certificate-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="certificate-title"
                    >

                        <button
                            className="certificate-close"
                            aria-label="Close certificate"
                            onClick={() => setCertificateOpen(false)}
                        >
                            ×
                        </button>

                        <div className="certificate-heading">
                            <div className="certificate-seal">✓</div>

                            <div>
                                <p className="small-title">
                                    COURSE COMPLETION
                                </p>

                                <h2 id="certificate-title">
                                    Certificate of Completion
                                </h2>
                            </div>
                        </div>

                        <div className="certificate-recipient">
                            <p>This certificate recognizes the successful completion of</p>
                            <h3>{course.name}</h3>
                            <p>{course.description}</p>
                        </div>

                        <div className="certificate-details">
                            <div>
                                <span>Completion</span>
                                <strong>{progress}%</strong>
                            </div>
                            <div>
                                <span>Status</span>
                                <strong>Completed</strong>
                            </div>
                            <div>
                                <span>Course ID</span>
                                <strong>#{course.id}</strong>
                            </div>
                        </div>

                    </div>

                </div>

            )} */}


            <div className="modern-card">

                <p className="small-title">
                    COURSE CONTENT
                </p>

                <h2>
                    Course Lessons
                </h2>

                {lessons.map(function (lesson) {

                    const completed =
                        completedLessons.includes(lesson.id);

                    return (

                        <div
                            className="settings"
                            key={lesson.id}
                        >

                            <h3>
                                {completed ? "✅" : "📘"}{" "}
                                Lesson {lesson.id}:{" "}
                                {lesson.title}
                            </h3>

                            <p>
                                {lesson.description}
                            </p>

                            <button
                                className="primary-button"
                                disabled={completed}
                                onClick={() =>
                                    setSelectedLesson(lesson)
                                }
                            >
                                {completed
                                    ? "✓ Completed"
                                    : "Start Lesson →"}
                            </button>

                        </div>

                    );

                })}

            </div>


            {selectedLesson && (

                <div className="modern-card">

                    <p className="small-title">
                        CURRENT LESSON
                    </p>

                    <h2>
                        📖 Lesson {selectedLesson.id}:{" "}
                        {selectedLesson.title}
                    </h2>

                    <p>
                        {selectedLesson.description}
                    </p>

                    <button
                        className="primary-button"
                        onClick={() =>
                            completeLesson(selectedLesson.id)
                        }
                    >
                        ✓ Complete Lesson
                    </button>

                </div>

            )}


            <button
                className="primary-button"
                onClick={() => navigate("/courses")}
            >
                ← Back to Courses
            </button>

            <div className="modern-card">

                <p className="small-title">
                    COURSE PROGRESS
                </p>

                <h2>
                    {progress}% Completed
                </h2>

                <div className="progress-certificate-row">

                    <div className="modern-progress">
                        <div
                            style={{
                                width: `${progress}%`
                            }}
                        ></div>
                    </div>

                    <button
                        className="primary-button certificate-button"
                        disabled={progress < 100}
                        onClick={() => setCertificateOpen(true)}
                    >
                        Course Complete Certificate
                    </button>

                </div>

            </div>


            {certificateOpen && (

                <div className="certificate-overlay">

                    <div
                        className="certificate-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="certificate-title"
                    >

                        <button
                            className="certificate-close"
                            aria-label="Close certificate"
                            onClick={() => setCertificateOpen(false)}
                        >
                            ×
                        </button>

                        <div className="certificate-heading">
                            <div className="certificate-seal">✓</div>

                            <div>
                                <p className="small-title">
                                    COURSE COMPLETION
                                </p>

                                <h2 id="certificate-title">
                                    Certificate of Completion
                                </h2>
                            </div>
                        </div>

                        <div className="certificate-recipient">
                            <p>This certificate recognizes the successful completion of</p>
                            <h3>{course.name}</h3>
                            <p>{course.description}</p>
                        </div>

                        <div className="certificate-details">
                            <div>
                                <span>Completion</span>
                                <strong>{progress}%</strong>
                            </div>
                            <div>
                                <span>Status</span>
                                <strong>Completed</strong>
                            </div>
                            <div>
                                <span>Course ID</span>
                                <strong>#{course.id}</strong>
                            </div>
                        </div>

                    </div>

                </div>

            )}

        </div>

        
    );
}

export default CourseLearning;