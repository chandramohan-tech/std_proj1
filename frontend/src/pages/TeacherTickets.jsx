import { useEffect, useState } from "react";
import axios from "axios";

function TeacherTickets() {

    const [tickets, setTickets] = useState([]);
    const [responses, setResponses] = useState({});
    const [ticketMessage, setTicketMessage] = useState({});
    const [ticketSuccess, setTicketSuccess] = useState({});

    function loadTickets() {

        axios.get("http://127.0.0.1:8000/api/support-tickets/")
            .then(function (response) {
                setTickets(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(function () {
        loadTickets();
    }, []);

    function answerTicket(ticketId) {

        const responseText = responses[ticketId] || "";

        if (responseText.trim() === "") {
            setTicketMessage((prev) => ({
                ...prev,
                [ticketId]: "Please enter a response before sending."
            }));
            return;
        }

        setTicketMessage((prev) => ({
            ...prev,
            [ticketId]: ""
        }));
        setTicketSuccess((prev) => ({
            ...prev,
            [ticketId]: ""
        }));

        axios.put(
            `http://127.0.0.1:8000/api/support-tickets/${ticketId}/respond/`,
            {
                response: responseText
            }
        )
        .then(function () {

            setTicketSuccess((prev) => ({
                ...prev,
                [ticketId]: "Response sent successfully!"
            }));

            setResponses({
                ...responses,
                [ticketId]: ""
            });

            loadTickets();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className="dashboard">

            <div className="dashboard-header">

                <div>
                    <p className="small-title">TEACHER PANEL</p>

                    <h1>Support Tickets 🎫</h1>

                    <p>
                        Review student problems and provide support.
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
                            STUDENT SUPPORT
                        </p>

                        <h2>
                            All Tickets
                        </h2>
                    </div>

                    <span className="round-icon">
                        💬
                    </span>

                </div>


                {tickets.length === 0 ? (

                    <p>No support tickets available.</p>

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
                                    Student ID: {ticket.student}
                                </p>

                                <p>
                                    <strong>Problem:</strong>{" "}
                                    {ticket.problem}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    {ticket.status}
                                </p>

                                <p>
                                    <strong>Response:</strong>{" "}
                                    {ticket.response ||
                                        "Waiting for teacher response"}
                                </p>


                                <div className="teacher-response-box">
                                    <input
                                        type="text"
                                        className="teacher-response-input"
                                        placeholder="Enter teacher response"
                                        value={responses[ticket.id] || ""}
                                        onChange={(e) =>
                                            setResponses({
                                                ...responses,
                                                [ticket.id]: e.target.value
                                            })
                                        }
                                    />

                                    <button
                                        className="primary-button teacher-response-button"
                                        onClick={() =>
                                            answerTicket(ticket.id)
                                        }
                                    >
                                        Send Response →
                                    </button>

                                    {ticketMessage[ticket.id] && (
                                        <p className="validation-message" style={{ fontSize: "0.9rem", marginTop: "10px" }}>
                                            {ticketMessage[ticket.id]}
                                        </p>
                                    )}

                                    {ticketSuccess[ticket.id] && (
                                        <p className="success-message" style={{ fontSize: "0.9rem", marginTop: "10px" }}>
                                            {ticketSuccess[ticket.id]}
                                        </p>
                                    )}
                                </div>

                            </div>
                        );

                    })

                )}

            </div>

        </div>
    );
}

export default TeacherTickets;