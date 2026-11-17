import { useEffect, useState } from "react";
import axios from "axios";

function SupportTickets() {

    const [problem, setProblem] = useState("");
    const [tickets, setTickets] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [validationMessage, setValidationMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const studentId = localStorage.getItem("student_id");

    function loadTickets() {

        axios.get("http://127.0.0.1:8000/api/support-tickets/")
            .then(function (response) {

                const myTickets = response.data.filter(
                    function (ticket) {
                        return String(ticket.student) === String(studentId);
                    }
                );

                setTickets(myTickets);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(function () {
        loadTickets();
    }, []);

    function createTicket() {

        if (problem.trim() === "") {
            setValidationMessage("Please enter your problem before submitting the ticket.");
            setSuccessMessage("");
            return;
        }

        setValidationMessage("");
        setSuccessMessage("");

        axios.post(
            "http://127.0.0.1:8000/api/support-tickets/",
            {
                student: studentId,
                problem: problem
            }
        )
        .then(function () {

            setProblem("");
            setShowSuccess(true);
            setSuccessMessage("Ticket created successfully!");

            setTimeout(function () {
                setShowSuccess(false);
            }, 5000);

            loadTickets();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className="dashboard">

            {showSuccess && (
                <div className="login-success-notification" role="status">
                    Ticket Created Successfully!
                </div>
            )}

            <div className="dashboard-header">

                <div>

                    <p className="small-title">
                        STUDENT SUPPORT
                    </p>

                    <h1>
                        Support Tickets 🎫
                    </h1>

                    <p>
                        Get help from your teacher when you need it.
                    </p>

                </div>

                <div className="header-icon">
                    🤖
                </div>

            </div>


            <div className="modern-card">

                <p className="small-title">
                    CREATE TICKET
                </p>

                <h2>
                    Need Help?
                </h2>

                <textarea
                    className="support-ticket-textarea"
                    placeholder="Describe your problem in detail..."
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    rows="5"
                />

                <button
                    className="primary-button"
                    onClick={createTicket}
                >
                    Create Ticket →
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


            <div className="modern-card">

                <div className="card-title">

                    <div>

                        <p className="small-title">
                            MY SUPPORT
                        </p>

                        <h2>
                            My Tickets
                        </h2>

                    </div>

                    <span className="round-icon">
                        💬
                    </span>

                </div>


                {tickets.length === 0 ? (

                    <p>
                        No support tickets yet.
                    </p>

                ) : (

                    tickets.map(function (ticket) {

                        return (
                            <div
                                className="settings"
                                key={ticket.id}
                            >

                                <h3>
                                    🎫 Ticket #{ticket.id}
                                </h3>

                                <p>
                                    <strong>Problem:</strong>{" "}
                                    {ticket.problem}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    {ticket.status}
                                </p>

                                <p>
                                    <strong>Teacher Response:</strong>{" "}
                                    {ticket.response ||
                                        "Waiting for teacher response"}
                                </p>

                            </div>
                        );

                    })

                )}

            </div>

        </div>
    );
}

export default SupportTickets;