function TaskStats({ tasks }) {
    
    // 1. Calculate stats for the cards
    const stats = {
        jobs: tasks.filter(t => t.category === "Job").length,
        learning: tasks.filter(t => t.category === "Learning").length,
        projects: tasks.filter(t => t.category === "Project").length,
        urgent: tasks.filter(t => t.priority === "High").length
    };

    // 2. Filter the 3 most urgent upcoming deadlines
    const upcoming = tasks
        .filter(t => t.deadline && new Date(t.deadline) > new Date())
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .slice(0, 3);

    return (
        <div className="animate__animated animate__fadeIn">
            <h3 className="mb-4">Overview</h3>
            
            {/* STATS CARDS */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm bg-primary text-white p-3">
                        <small>Job Applications</small>
                        <h2>{stats.jobs}</h2>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm bg-success text-white p-3">
                        <small>Learning Tracks</small>
                        <h2>{stats.learning}</h2>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm bg-info text-white p-3">
                        <small>Active Projects</small>
                        <h2>{stats.projects}</h2>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm bg-danger text-white p-3">
                        <small>High Priority</small>
                        <h2>{stats.urgent}</h2>
                    </div>
                </div>
            </div>

            {/* UPCOMING SECTION */}
            <div className="card border-0 shadow-sm p-4">
                <h5 className="card-title mb-3">Upcoming Deadlines</h5>
                {upcoming.length > 0 ? (
                    <ul className="list-group list-group-flush">
                        {upcoming.map(task => (
                            <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center px-0">
                                <div>
                                    <strong>{task.title}</strong>
                                    <br />
                                    <small className="text-muted">{task.category}</small>
                                </div>
                                <span className="badge bg-light text-dark border">
                                    {new Date(task.deadline).toLocaleDateString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted">No upcoming deadlines found.</p>
                )}
            </div>
        </div>
    );
}

export default TaskStats;