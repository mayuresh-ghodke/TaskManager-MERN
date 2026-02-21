import { useState, useMemo } from "react";
import { deleteTask, updateTask } from "../services/taskService";

// We receive 'tasks' and 'refreshTasks' (to trigger a re-fetch in the parent) as props
function TaskList({ tasks, refreshTasks }) {

    const statusMap = {
        Learning: ["Saved", "Started", "Completed"],
        Job: ["Saved", "Applied", "Interviewed", "Rejected", "Selected"],
        Project: ["Saved", "Started", "In Progress", "Completed"]
    };

    const [selectedTask, setSelectedTask] = useState(null);
    const [formData, setFormData] = useState({});
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [tasksPerPage, setTasksPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);

    /* ---------------- DELETE ---------------- */
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            await deleteTask(id);
            refreshTasks(); // Tell Dashboard to update the task list
        }
    };

    /* ---------------- EDIT ---------------- */
    const handleEditClick = (task) => {
        setSelectedTask(task);
        setFormData(task);
        setShowModal(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        await updateTask(selectedTask._id, formData);
        refreshTasks(); // Tell Dashboard to update the task list
        setShowModal(false);
    };

    /* ---------------- TIME CALCULATION ---------------- */
    const getTimeInfo = (task) => {
        if (!task.deadline) return "No deadline";

        const now = new Date();
        const deadline = new Date(task.deadline);
        const diff = deadline - now;
        const days = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));

        return diff > 0 ? `${days} days left` : `${days} days overdue`;
    };

    const getBadgeColor = (priority) => {
        if (priority === "High") return "danger";
        if (priority === "Medium") return "warning";
        return "success";
    };

    /* ---------------- FILTER & PAGINATION ---------------- */
    const filteredTasks = useMemo(() => {
        if (categoryFilter === "All") return tasks;
        return tasks.filter(task => task.category === categoryFilter);
    }, [tasks, categoryFilter]);

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    const paginatedTasks = filteredTasks.slice(
        (currentPage - 1) * tasksPerPage,
        currentPage * tasksPerPage
    );

    const uniqueCategories = [...new Set(tasks.map(t => t.category))];

    return (
        <div className="container mt-2">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Your Tasks ({filteredTasks.length})</h4>
                <div className="d-flex gap-2">
                    <select 
                        className="form-select form-select-sm" 
                        style={{ width: '150px' }}
                        value={categoryFilter}
                        onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="All">All Categories</option>
                        {uniqueCategories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <select 
                        className="form-select form-select-sm" 
                        style={{ width: '120px' }}
                        value={tasksPerPage} 
                        onChange={(e) => { setTasksPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    >
                        <option value={3}>3/page</option>
                        <option value={6}>6/page</option>
                        <option value={9}>9/page</option>
                    </select>
                </div>
            </div>

            {/* TASK CARDS */}
            <div className="row">
                {paginatedTasks.length === 0 && (
                    <div className="col-12 text-center py-5">
                        <p className="text-muted">No tasks found for this category.</p>
                    </div>
                )}

                {paginatedTasks.map((task) => (
                    <div key={task._id} className="col-md-6 col-lg-4 mb-4">
                        <div className="card shadow-sm h-100 border-0">
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="badge bg-light text-dark border">{task.category}</span>
                                    <span className={`badge bg-${getBadgeColor(task.priority)}`}>{task.priority}</span>
                                </div>
                                <h5 className="card-title">{task.title}</h5>
                                <p className="text-muted small mb-3 text-truncate-2">{task.description}</p>
                                
                                <div className="mb-2">
                                    <small className="text-muted d-block">Status</small>
                                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                                        {task.status}
                                    </span>
                                </div>

                                {task.deadline && (
                                    <div className="mt-3 p-2 bg-light rounded">
                                        <small className="d-block text-muted">Deadline: {new Date(task.deadline).toLocaleDateString()}</small>
                                        <small className={`fw-bold ${new Date(task.deadline) < new Date() ? 'text-danger' : 'text-success'}`}>
                                            {getTimeInfo(task)}
                                        </small>
                                    </div>
                                )}
                            </div>

                            <div className="card-footer bg-white border-top-0 d-flex justify-content-between pb-3">
                                <button className="btn btn-sm btn-outline-warning" onClick={() => handleEditClick(task)}>Edit</button>
                                {task.file && (
                                    <a href={`http://localhost:5000/uploads/${task.file}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-secondary">File</a>
                                )}
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(task._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
                <nav className="mt-4">
                    <ul className="pagination justify-content-center">
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}

            {/* EDIT MODAL */}
            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content shadow border-0">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Edit {formData.category} Task</h5>
                                <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <label className="small fw-bold">Title</label>
                                <input className="form-control mb-3" name="title" value={formData.title || ""} onChange={handleChange} />

                                <label className="small fw-bold">Description</label>
                                <textarea className="form-control mb-3" name="description" value={formData.description || ""} onChange={handleChange} />

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="small fw-bold">Status</label>
                                        <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                                            {statusMap[formData.category]?.map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="small fw-bold">Priority</label>
                                        <select className="form-select" name="priority" value={formData.priority || ""} onChange={handleChange}>
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-light" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskList;