import { useState } from "react";
import {useNavigate} from "react-router-dom";
import API from "../api/api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Register(){

    const [form, setForm] = useState({
        name: "",
        email:"",
        password:""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post('/auth/register', form);
        alert("Registered Successfully.");
        navigate("/login");
    };

    return (
        <div className="container-fluid">
            <Navbar />
            <div className="row justify-content-center align-items-center min-vh-100 bg-light">

                <div className="col-md-6 col-lg-4">
                    <div className="card shadow">
                        <div className="card-body p-4">

                            <h3 className="text-center mb-4">Register</h3>

                            <form onSubmit={handleSubmit}>

                                {/* Name */}
                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your name"
                                        required
                                        onChange={(e) =>
                                            setForm({ ...form, name: e.target.value })
                                        }
                                    />
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        required
                                        onChange={(e) =>
                                            setForm({ ...form, email: e.target.value })
                                        }
                                    />
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        required
                                        onChange={(e) =>
                                            setForm({ ...form, password: e.target.value })
                                        }
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div className="mb-3">
                                    <label className="form-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Re-enter password"
                                        required
                                        onChange={(e) =>
                                            setForm({ ...form, confirmPassword: e.target.value })
                                        }
                                    />
                                </div>

                                {/* Button */}
                                <div className="d-grid mb-3">
                                    <button className="btn btn-success">
                                        Sign up
                                    </button>
                                </div>
                                
                                <div className="d-grid mb-3">
                                    <a href="http://localhost:5000/api/auth/google"
                                        className="btn btn-sm-primary">
                                            Signup With Google
                                    </a>
                                </div>
                            </form>

                            {/* Login Link */}
                            <div className="text-center">
                                <small>
                                    Already have an account?{" "}
                                    <Link to="/login">Login</Link>
                                </small>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Register;