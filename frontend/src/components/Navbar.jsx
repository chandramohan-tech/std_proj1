import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const name = localStorage.getItem("student_name");

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
            value.includes("python") ||
            value.includes("react") ||
            value.includes("course")
        ) {
            navigate("/courses");
        }

        else if (
            value.includes("quiz") ||
            value.includes("test")
        ) {
            navigate("/quizzes");
        }

        else if (
            value.includes("ai") ||
            value.includes("tutor") ||
            value.includes("question")
        ) {
            navigate("/ai-tutor");
        }

        else if (
            value.includes("support") ||
            value.includes("ticket") ||
            value.includes("problem")
        ) {
            navigate("/support");
        }

        else if (
            value.includes("resource") ||
            value.includes("book") ||
            value.includes("learn")
        ) {
            navigate("/resources");
        }

        else if (
            value.includes("setting") ||
            value.includes("profile")
        ) {
            navigate("/settings");
        }

        else {
            setSearchMessage("No matching page found.");
        }

        setSearch("");
    }

    function logout() {

        localStorage.removeItem("student_id");
        localStorage.removeItem("student_name");
        localStorage.removeItem("student_email");

        navigate("/login");
    }

    return (
        <div className="navbar">

            <form onSubmit={handleSearch}>

                <input
                    type="text"
                    placeholder="Search EduAI..."
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
                <button type="button" className="navbar-bell" aria-label="Notifications">
                    🔔
                </button>
                👤 {name}

                <button onClick={logout}>
                    Logout
                </button>
            </div>

        </div>
    );
}

export default Navbar;
