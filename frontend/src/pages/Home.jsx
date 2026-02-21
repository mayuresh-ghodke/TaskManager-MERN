import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
    return (

        <div className="container-fluid">
            <Navbar />
            {/* Hero Section */}
            <div className="row align-items-center justify-content-center text-center bg-light" style={{ minHeight: "80vh" }}>
                <div className="col-md-8">

                    <h1 className="display-4 fw-bold mb-3">
                        Manage Your Tasks Efficiently
                    </h1>

                    <p className="lead text-muted mb-4">
                        Organize your learning goals, projects, and job applications 
                        in one powerful and simple task management system.
                    </p>

                    <div>
                        <Link to="/register" className="btn btn-primary btn-lg me-3">
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container py-2">
                <div className="row text-center">

                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">Smart Categorization</h5>
                                <p className="card-text">
                                    Organize tasks into Learning, Projects, and Job 
                                    categories with dynamic status tracking.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">Status History</h5>
                                <p className="card-text">
                                    Track every status update with date and time 
                                    to monitor your progress clearly.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">Secure Access</h5>
                                <p className="card-text">
                                    Protected dashboard with authentication 
                                    to keep your tasks private and secure.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3">
                <small>© {new Date().getFullYear()} Task Manager App. All rights reserved.</small>
            </footer>

        </div>
    );
}

export default Home;
