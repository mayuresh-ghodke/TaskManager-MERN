import { Link } from "react-router-dom";

function Navbar(){
    return(
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                <a className="navbar-brand fw-bold" href="/home">Task Manager</a>
                <div className="ms-auto">
                    <Link to="/login" className="btn btn-outline-light me-2">
                        Login
                    </Link>
                    <Link to="/register" className="btn btn-primary">
                        Register
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar;