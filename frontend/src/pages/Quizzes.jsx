import { useEffect, useState } from "react";
import axios from "axios";

const quizQuestions = [
    {
        id: "q1",
        question: "Which language are we using for the backend?",
        options: ["Java", "Python", "PHP"],
        correctAnswer: "Python"
    },
    {
        id: "q2",
        question: "Which library are we using for frontend?",
        options: ["React", "Django", "MySQL"],
        correctAnswer: "React"
    },
    {
        id: "q3",
        question: "Which database can we use?",
        options: ["Python", "React", "MySQL"],
        correctAnswer: "MySQL"
    }
];

function Quizzes() {

    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [results, setResults] = useState([]);
    const [validationMessage, setValidationMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [answers, setAnswers] = useState({
        q1: "",
        q2: "",
        q3: ""
    });

    const studentId = localStorage.getItem("student_id");

    function loadResults() {

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
    }

    useEffect(function () {
        loadResults();
    }, []);

    function handleOptionChange(questionId, value) {
        setAnswers(function (currentAnswers) {
            return {
                ...currentAnswers,
                [questionId]: currentAnswers[questionId] === value ? "" : value
            };
        });
    }

    function submitQuiz() {

        const unansweredQuestion = quizQuestions.find(function (question) {
            return !answers[question.id];
        });

        if (unansweredQuestion) {
            setValidationMessage("Please answer all questions before submitting the quiz.");
            setSuccessMessage("");
            return;
        }

        setValidationMessage("");
        setSuccessMessage("");

        let totalScore = 0;

        quizQuestions.forEach(function (question) {
            if (answers[question.id] === question.correctAnswer) {
                totalScore++;
            }
        });

        axios.post("http://127.0.0.1:8000/api/quiz-results/", {
            student: studentId,
            score: totalScore,
            total: 3
        })
        .then(function () {

            setScore(totalScore);
            setSubmitted(true);
            setSuccessMessage("Quiz submitted successfully!");

            loadResults();

        })
        .catch(function () {
            alert("Failed to save quiz result.");
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
                        Quizzes 📝
                    </h1>

                    <p>
                        Test your knowledge and track your progress.
                    </p>
                </div>

                <div className="header-icon">
                    🤖
                </div>

            </div>


            <div className="modern-card">

                <p className="small-title">
                    QUICK QUIZ
                </p>

                <h2>
                    Test Your Knowledge
                </h2>


                {quizQuestions.map(function (question, index) {
                    return (
                        <div className="settings" key={question.id}>

                            <h3>
                                {index + 1}. {question.question}
                            </h3>

                            <div className="quiz-option-list">
                                {question.options.map(function (option) {
                                    const checked = answers[question.id] === option;

                                    return (
                                        <label
                                            className={`quiz-option ${checked ? "selected" : ""}`}
                                            key={option}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() => handleOptionChange(question.id, option)}
                                            />
                                            <span>{option}</span>
                                        </label>
                                    );
                                })}
                            </div>

                        </div>
                    );
                })}


                <button
                    className="primary-button"
                    onClick={submitQuiz}
                >
                    Submit Quiz →
                </button>

                {validationMessage && (
                    <p className="validation-message">
                        {validationMessage}
                    </p>
                )}

                {successMessage && (
                    <p className="success-message">
                        {successMessage}
                    </p>
                )}

            </div>


            {submitted && (

                <div className="modern-card">

                    <p className="small-title">
                        LATEST RESULT
                    </p>

                    <h2>
                        🏆 Your Score: {score}/3
                    </h2>

                    <p>
                        Keep learning and improve your score!
                    </p>

                </div>

            )}


            <div className="modern-card">

                <div className="card-title">

                    <div>
                        <p className="small-title">
                            QUIZ HISTORY
                        </p>

                        <h2>
                            Previous Attempts
                        </h2>
                    </div>

                    <span className="round-icon">
                        📊
                    </span>

                </div>


                {results.length === 0 ? (

                    <p>
                        No previous quiz attempts.
                    </p>

                ) : (

                    results.map(function (result) {

                        const percentage = Math.round(
                            (result.score / result.total) * 100
                        );

                        return (

                            <div
                                className="settings"
                                key={result.id}
                            >

                                <h3>
                                    📝 Attempt #{result.id}
                                </h3>

                                <p>
                                    Score:{" "}
                                    <strong>
                                        {result.score}/{result.total}
                                    </strong>
                                </p>

                                <p>
                                    Performance:{" "}
                                    <strong>
                                        {percentage}%
                                    </strong>
                                </p>

                                <div className="modern-progress">

                                    <div
                                        style={{
                                            width: `${percentage}%`
                                        }}
                                    ></div>

                                </div>

                                <p>
                                    Date: {result.created_at}
                                </p>

                            </div>

                        );

                    })

                )}

            </div>

        </div>
    );
}

export default Quizzes;