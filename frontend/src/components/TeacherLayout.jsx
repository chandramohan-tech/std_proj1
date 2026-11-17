import TeacherSidebar from "./TeacherSidebar";
import TeacherNavbar from "./TeacherNavbar";
import Footer from "./Footer";

function TeacherLayout({ children }) {

    return (
        <div className="app">

            <TeacherSidebar />

            <div className="main">

                <TeacherNavbar />

                <div className="page">
                    {children}
                </div>

                <Footer />

            </div>

        </div>
    );
}

export default TeacherLayout;