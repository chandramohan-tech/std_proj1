import { useEffect, useState } from "react";
import axios from "axios";

function TeacherStudents() {

    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const studentsPerPage = 5;

    useEffect(function () {

        axios.get("http://127.0.0.1:8000/api/students/")
            .then(function (response) {
                setStudents(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    const filteredStudents = students.filter(function (student) {
        const searchText = searchTerm.toLowerCase();

        return (
            student.name.toLowerCase().includes(searchText) ||
            String(student.id).includes(searchText)
        );
    });

    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
    const firstStudentIndex = (currentPage - 1) * studentsPerPage;
    const visibleStudents = filteredStudents.slice(
        firstStudentIndex,
        firstStudentIndex + studentsPerPage
    );

    return (
        <div className="dashboard">

            <div className="dashboard-header">

                <div>
                    <p className="small-title">TEACHER PANEL</p>

                    <h1>🧑‍🎓Student Management </h1>

                    <p>
                        View and manage all registered students.
                    </p>
                </div>

                <div className="header-icon">
                    🤖
                </div>

            </div>

            <div className="modern-card student-management-card">

                <div className="card-title">

                    <div>
                        <p className="small-title">
                            REGISTERED STUDENTS
                        </p>

                        <h2>
                            All Students
                        </h2>
                    </div>

                    <label className="student-search-box">

                        <span aria-hidden="true">⌕</span>

                        <input
                            className="student-search-input"
                            type="search"
                            placeholder="Search by name or ID..."
                            value={searchTerm}
                            onChange={function (event) {
                                setSearchTerm(event.target.value);
                                setCurrentPage(1);
                            }}
                            aria-label="Search students by name or ID"
                        />

                    </label>

                </div>


                {students.length === 0 ? (

                    <p>No students registered yet.</p>

                ) : filteredStudents.length === 0 ? (

                    <p>No matching students found.</p>

                ) : (

                    visibleStudents.map(function (student) {

                        return (
                            <div
                                className="settings"
                                key={student.id}
                            >

                                <h3>
                                    👤 {student.name}
                                </h3>

                                <p>
                                    📧 {student.email}
                                </p>

                                <p>
                                    Student ID: #{student.id}
                                </p>

                            </div>
                        );

                    })

                )}

                {totalPages > 1 && (

                    <div className="student-pagination">

                        <button
                            type="button"
                            onClick={function () {
                                setCurrentPage(function (page) {
                                    return page - 1;
                                });
                            }}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>

                        <span>
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            type="button"
                            onClick={function () {
                                setCurrentPage(function (page) {
                                    return page + 1;
                                });
                            }}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
}

export default TeacherStudents;