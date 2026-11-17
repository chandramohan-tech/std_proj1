import { useState } from "react";
import axios from "axios";

function AITutor() {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    function askQuestion() {

        if (question.trim() === "") {
            setAnswer("Please enter a question.");
            return;
        }

        setLoading(true);
        setAnswer("");

        axios.post("http://127.0.0.1:8000/api/ai-tutor/", {
            question: question
        })
        .then(function (response) {
            setAnswer(response.data.answer);
        })
        .catch(function () {
            setAnswer("Unable to connect to AI Tutor.");
        })
        .finally(function () {
            setLoading(false);
        });
    }

    return (
        <div className="dashboard">

            <div className="dashboard-header">
                <div>
                    <p className="small-title">STUDENT LEARNING</p>
                    <h1>AI Tutor 🤖</h1>
                    <p>Ask questions and get instant learning support.</p>
                </div>

                <div className="header-icon">
                    🤖
                </div>
            </div>

            <div className="modern-ai-card">

                <div className="ai-top">
                    <span className="ai-round">🤖</span>

                    <span className="ai-label">
                        AI POWERED
                    </span>
                </div>

                <h2>Ask Your AI Tutor</h2>

                <p>
                    Get help with Python, React, Django, SQL and other
                    learning topics.
                </p>

                <input
                    className="ai-tutor-input"
                    type="text"
                    placeholder="Ask your question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            askQuestion();
                        }
                    }}
                />

               <div className="quick-buttons">
    <button onClick={() => setQuestion("What is Python?")}>
        🐍 What is Python?
    </button>

    <button onClick={() => setQuestion("What is React?")}>
        ⚛️ What is React?
    </button>

    <button onClick={() => setQuestion("What is Django?")}>
        🌐 What is Django?
    </button>

    <button onClick={() => setQuestion("What is SQL?")}>
        🗄️ What is SQL?
    </button>
</div>

                <button
                    className="ai-button"
                    onClick={askQuestion}
                    disabled={loading}
                >
                    {loading ? "Thinking..." : "Ask AI Tutor →"}
                </button>

                <button
    className="primary-button"
    onClick={() => {
        setQuestion("");
        setAnswer("");
    }}
>
    Clear Chat
</button>

            </div>

            {answer && (

                <div className="modern-card">

                    <p className="small-title">
                        AI RESPONSE
                    </p>

                    <h2>💡 Answer</h2>

                    <p>{answer}</p>

                </div>

            )}

        </div>
    );
}

export default AITutor;