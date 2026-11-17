import { useEffect, useState } from "react";
import axios from "axios";

function TeacherQuizzes() {

    const [results, setResults] = useState([]);

    useEffect(function () {

        axios.get("http://127.0.0.1:8000/api/quiz-results/")
            .then(function (response) {
                setResults(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    return (
        <div className="dashboard">

            <div className="dashboard-header">

                <div>
                    <p className="small-title">TEACHER PANEL</p>

                    <h1>Quiz Results 📝</h1>

                    <p>
                        Track student quiz performance.
                    </p>
                </div>

                <div className="header-icon">
                    🤖
                </div>

            </div>


            <div className="modern-card">

                <div className="card-title">

                    <div>
                        <p className="small-title">
                            STUDENT PERFORMANCE
                        </p>

                        <h2>
                            Quiz Results
                        </h2>
                    </div>

                    <span className="round-icon">
                        🏆
                    </span>

                </div>


                {results.length === 0 ? (

                    <p>No quiz results available.</p>

                ) : (

                    results.map(function (result) {

                        const percentage =
                            Math.round(
                                (result.score / result.total) * 100
                            );

                        return (
                            <div
                                className="settings"
                                key={result.id}
                            >

                                <h3>
                                    👤 Student #{result.student}
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

export default TeacherQuizzes;