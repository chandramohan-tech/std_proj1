import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TeacherNavbar() {

    const name = localStorage.getItem("teacher_name");

    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [searchMessage, setSearchMessage] = useState("");

    function handleSearch(e) {

        e.preventDefault();

        const value = search.toLowerCase().trim();

        if (value === "") {
            setSearchMessage("Please enter something to search.");
            return;
        }

        setSearchMessage("");

        if (
            value.includes("student") ||
            value.includes("students")
        ) {
            navigate("/teacher-students");
        }

        else if (
            value.includes("course") ||
            value.includes("courses")
        ) {
            navigate("/teacher-courses");
        }

        else if (
            value.includes("ticket") ||
            value.includes("support")
        ) {
            navigate("/teacher-tickets");
        }

        else if (
            value.includes("quiz") ||
            value.includes("result")
        ) {
            navigate("/teacher-quizzes");
        }

        else if (
            value.includes("dashboard") ||
            value.includes("home")
        ) {
            navigate("/teacher-dashboard");
        }

        else {
            setSearchMessage("No matching page found.");
        }

        setSearch("");
    }

    function logout() {

        localStorage.removeItem("teacher_id");
        localStorage.removeItem("teacher_name");
        localStorage.removeItem("teacher_email");

        navigate("/teacher-login");
    }

    return (
        <div className="navbar">

            <form onSubmit={handleSearch}>

                <input
                    type="text"
                    placeholder="Search Teacher Panel..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        if (searchMessage) setSearchMessage("");
                    }}
                />

                <button type="submit">
                    🔍
                </button>

            </form>

            {searchMessage && (
                <p className="validation-message" style={{ fontSize: "0.8rem", marginTop: "8px" }}>
                    {searchMessage}
                </p>
            )}

            <div>
                🔔
                👨‍🏫 {name}

                <button onClick={logout}>
                    Logout
                </button>
            </div>

        </div>
    );
}

export default TeacherNavbar;