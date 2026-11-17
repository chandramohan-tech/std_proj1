import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function TeacherLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [messageField, setMessageField] = useState("");

    const navigate = useNavigate();

    function showMessage(text, field) {
        setMessage(text);
        setMessageField(field);

        setTimeout(function () {
            setMessage("");
            setMessageField("");
        }, 5000);
    }

    function login() {

        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
        const validPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(password);

        if (!validEmail) {
            showMessage("Please enter a valid email address.", "email");
            return;
        }

        if (!validPassword) {
            showMessage("Password must be at least 8 characters and include a letter, number, and special character.", "password");
            return;
        }

        axios.post("http://127.0.0.1:8000/api/teacher-login/", {
            email,
            password
        })
        .then(function (response) {

            localStorage.setItem("teacher_id", response.data.teacher_id);
            localStorage.setItem("teacher_name", response.data.name);
            localStorage.setItem("teacher_email", response.data.email);

            setShowSuccess(true);

            setTimeout(function () {
                setShowSuccess(false);
                navigate("/teacher-dashboard");
            }, 5000);
        })
        .catch(function () {
            showMessage("Invalid teacher email or password.", "password");
        });
    }

    return (
        <div className="login">

            {showSuccess && (
                <div className="login-success-notification" role="status">
                    Login Successful!
                </div>
            )}

            <h1>🎓 <span>EduAI</span></h1>

            <h2>Teacher Login</h2>

            <input
                    type="email"
                    placeholder="Enter teacher email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
                    title="Enter a valid email address."
            />

            {message && messageField === "email" && (
                <p className="login-validation-message" role="alert">
                    {message}
                </p>
            )}

            <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="8"
                    pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$"
                    title="Password must be at least 8 characters and include a letter, number, and special character."
            />

            {message && messageField === "password" && (
                <p className="login-validation-message" role="alert">
                    {message}
                </p>
            )}

            <button onClick={login}>
                Login
            </button>

            <p>
                Don't have an account?{" "}
                <Link to="/teacher-register">
                    Register
                </Link>
            </p>

            <p>
                Are you a student?{" "}
                <Link to="/login">
                    Student Login
                </Link>
            </p>

        </div>
    );
}

export default TeacherLogin;