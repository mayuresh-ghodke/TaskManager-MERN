import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login(){

    const [form, setForm] = useState({
        email:"",
        password:""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await API.post("/auth/login", form);

        localStorage.setItem("token", res.data.token);

        navigate("/dashboard");
    }

    return(
        <>
            <div className="container-fluid">
                <Navbar />
                <div className="row justify-content-center align-items-center min-vh-100 bg-light">
                    <div className="col-md-5 col-lg-4">
                        <div className="card shadow">
                            <div className="card-body p-4">

                                <h3 className="text-center mb-4">Login</h3>

                                <form onSubmit={handleSubmit}>

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

                                    {/* Button */}
                                    <div className="d-grid mb-3">
                                        <button className="btn btn-primary">
                                            Login
                                        </button>
                                    </div>
                                    
                                    <div className="d-grid mb-3">
                                        <a href="http://localhost:5000/api/auth/google"
                                            className="btn btn-sm-primary">
                                                Login With Google
                                        </a>
                                    </div>
                                </form>

                                {/* Register Link */}
                                <div className="text-center">
                                    <small>
                                        Don't have an account?{" "}
                                        <Link to="/register">Register</Link>
                                    </small>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Login;