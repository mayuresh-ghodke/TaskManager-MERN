import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getAllTasks } from "../services/taskService";

// Components
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskStats from "../components/TaskStats"; 

function Dashboard() {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [activeView, setActiveView] = useState("stats"); // 'stats' is now the home view
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();

    // 1. Fetch User and Tasks on Mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (err) {
                console.error("Invalid Token");
                handleLogout();
            }
        } else {
            navigate("/login");
        }
        fetchTasks();
    }, [navigate]);

    // 2. Centralized Fetch Logic
    const fetchTasks = async () => {
        setLoading(true);
        try {
            const data = await getAllTasks();
            setTasks(data);
        } catch (error) {
            console.error("Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="container-fluid">
            <div className="row min-vh-100">

                {/* --- SIDEBAR --- */}
                <div className="col-md-3 col-lg-2 bg-dark text-white p-3 shadow">
                    <h4 className="mb-4 text-center border-bottom pb-2">Task Manager</h4>

                    <div className="mb-4 px-2">
                        {user ? (
                            <div className="small text-secondary">
                                Logged in as: <br />
                                <span className="text-white fw-bold">{user.name}</span>
                            </div>
                        ) : (
                            <span className="small">Loading user...</span>
                        )}
                    </div>

                    <ul className="nav flex-column gap-2">
                        <li className="nav-item">
                            <button
                                className={`btn w-100 text-start ${activeView === "stats" ? "btn-primary" : "btn-outline-light border-0"}`}
                                onClick={() => setActiveView("stats")}>
                                <i className="bi bi-house-door me-2"></i> Home (Stats)
                            </button>
                        </li>

                        <li className="nav-item">
                            <button
                                className={`btn w-100 text-start ${activeView === "view" ? "btn-primary" : "btn-outline-light border-0"}`}
                                onClick={() => setActiveView("view")}>
                                <i className="bi bi-list-check me-2"></i> View All Tasks
                            </button>
                        </li>

                        <li className="nav-item">
                            <button
                                className={`btn w-100 text-start ${activeView === "create" ? "btn-primary" : "btn-outline-light border-0"}`}
                                onClick={() => setActiveView("create")}>
                                <i className="bi bi-plus-circle me-2"></i> Create Task
                            </button>
                        </li>

                        <li className="nav-item mt-5">
                            <button className="btn btn-danger w-100" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>

                {/* --- MAIN CONTENT AREA --- */}
                <div className="col-md-9 col-lg-10 p-4 bg-light">
                    {loading ? (
                        <div className="text-center mt-5">
                            <div className="spinner-border text-primary" role="status"></div>
                            <p className="mt-2">Synchronizing tasks...</p>
                        </div>
                    ) : (
                        <div className="container">
                            {/* Logic: Show Stats summary */}
                            {activeView === "stats" && <TaskStats tasks={tasks} />}

                            {/* Logic: Show Form and refresh tasks after adding */}
                            {activeView === "create" && (
                                <div className="card shadow-sm p-4">
                                    <h4 className="mb-3">Add New Task</h4>
                                    <TaskForm onTaskAdded={() => {
                                        fetchTasks();
                                        setActiveView("view");
                                    }} />
                                </div>
                            )}

                            {/* Logic: Show List and pass fetchTasks as a refresh prop */}
                            {activeView === "view" && (
                                <TaskList 
                                    tasks={tasks} 
                                    refreshTasks={fetchTasks} 
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;