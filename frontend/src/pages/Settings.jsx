import { useEffect, useState } from "react";
import axios from "axios";

function Settings() {

    const [student, setStudent] = useState(null);

    useEffect(function () {

        const studentId = localStorage.getItem("student_id");

        axios.get(
            `http://127.0.0.1:8000/api/student-profile/${studentId}/`
        )
        .then(function (response) {
            setStudent(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

    }, []);

    return (
        <div className="dashboard">

            <div className="dashboard-header">

                <div>

                    <p className="small-title">
                        STUDENT ACCOUNT
                    </p>

                    <h1>
                        Settings ⚙️
                    </h1>

                    <p>
                        Manage your EduAI profile and account.
                    </p>

                </div>

                <div className="header-icon">
                    🤖
                </div>

            </div>


            {student && (

                <div className="modern-card">

                    <div className="card-title">

                        <div>

                            <p className="small-title">
                                PROFILE
                            </p>

                            <h2>
                                Personal Information
                            </h2>

                        </div>

                        <span className="round-icon">
                            👤
                        </span>

                    </div>


                    <div className="settings">

                        <h3>
                            👤 Name
                        </h3>

                        <p>
                            {student.name}
                        </p>

                    </div>


                    <div className="settings">

                        <h3>
                            📧 Email
                        </h3>

                        <p>
                            {student.email}
                        </p>

                    </div>


                    <div className="settings">

                        <h3>
                            🎓 Role
                        </h3>

                        <p>
                            Student
                        </p>

                    </div>

                </div>

            )}


            <div className="modern-card">

                <div className="card-title">

                    <div>

                        <p className="small-title">
                            ACCOUNT SECURITY
                        </p>

                        <h2>
                            Password
                        </h2>

                    </div>

                    <span className="round-icon">
                        🔐
                    </span>

                </div>


                <p>
                    Keep your account secure by changing
                    your password regularly.
                </p>


                <button className="primary-button">
                    Change Password →
                </button>

            </div>

        </div>
    );
}

export default Settings;