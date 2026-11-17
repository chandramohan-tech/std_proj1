function Resources() {

    return (
        <div className="dashboard">

            <div className="dashboard-header">

                <div>

                    <p className="small-title">
                        STUDENT LEARNING
                    </p>

                    <h1>
                        Learning Resources 📖
                    </h1>

                    <p>
                        Explore useful resources to improve your skills.
                    </p>

                </div>

                <div className="header-icon">
                    🤖
                </div>

            </div>


            <div className="resources-grid">

                <div className="modern-card resource-card">

                    <div className="card-title">

                        <div>

                            <p className="small-title">
                                PROGRAMMING
                            </p>

                            <h2>
                                Python 🐍
                            </h2>

                        </div>

                        <span className="round-icon">
                            🐍
                        </span>

                    </div>

                    <p>
                        Learn Python programming from basics
                        to advanced concepts.
                    </p>

                    <a
                        href="https://www.w3schools.com/python/default.asp"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <button className="primary-button">
                            View Resource →
                        </button>
                    </a>

                </div>


                <div className="modern-card resource-card">

                    <div className="card-title">

                        <div>

                            <p className="small-title">
                                FRONTEND
                            </p>

                            <h2>
                                React JS ⚛️
                            </h2>

                        </div>

                        <span className="round-icon">
                            ⚛️
                        </span>

                    </div>

                    <p>
                        Learn React components, state,
                        props and events.
                    </p>

                    <a
                        href="https://www.w3schools.com/react/default.asp"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <button className="primary-button">
                            View Resource →
                        </button>
                    </a>

                </div>


                <div className="modern-card resource-card">

                    <div className="card-title">

                        <div>

                            <p className="small-title">
                                DATABASE
                            </p>

                            <h2>
                                MySQL 🗄️
                            </h2>

                        </div>

                        <span className="round-icon">
                            🗄️
                        </span>

                    </div>

                    <p>
                        Learn SQL queries, databases and
                        MySQL concepts.
                    </p>

                    <a
                        href="https://www.w3schools.com/mysql/default.asp"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <button className="primary-button">
                            View Resource →
                        </button>
                    </a>

                </div>

            </div>

        </div>
    );
}

export default Resources;