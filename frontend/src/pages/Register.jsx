import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [messageField, setMessageField] = useState("");

    function showMessage(text, field) {
        setMessage(text);
        setMessageField(field);

        setTimeout(function () {
            setMessage("");
            setMessageField("");
        }, 5000);
    }

    function register() {

        const validName = /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name);
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
        const validPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(password);

        if (!validName) {
            showMessage("Name can contain letters and spaces only.", "name");
            return;
        }

        if (!validEmail) {
            showMessage("Please enter a valid email address.", "email");
            return;
        }

        if (!validPassword) {
            showMessage("Password must be at least 8 characters and include a letter, number, and special character.", "password");
            return;
        }

        axios.post("http://127.0.0.1:8000/api/students/", {
            name: name,
            email: email,
            password: password
        })
        .then(function() {
            setShowSuccess(true);

            setName("");
            setEmail("");
            setPassword("");

            setTimeout(function () {
                setShowSuccess(false);
            }, 5000);
        })

        .catch(function(error) {

    console.log("ERROR:", error);
    console.log("RESPONSE:", error.response);

    showMessage(
        error.response?.data
            ? JSON.stringify(error.response.data)
            : error.message,
        "email"
    );

});
        
    }

    return (
        <div className="login">

            {showSuccess && (
                <div className="login-success-notification" role="status">
                    Register Successfull!
                </div>
            )}

            <h1>🎓 EduAI</h1>

            <h2>Student Registration</h2>

            <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    pattern="^[A-Za-z]+(?: [A-Za-z]+)*$"
                    title="Name can contain letters and spaces only."
            />

            {message && messageField === "name" && (
                <p className="login-validation-message" role="alert">
                    {message}
                </p>
            )}

            <input
                    type="email"
                    placeholder="Enter email"
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

            <button onClick={register}>
                Register
            </button>

            <p>
                Already have an account?
                <Link to="/login"> Login</Link>
            </p>

        </div>
    );
}

export default Register;