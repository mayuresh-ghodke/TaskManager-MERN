import { useState } from "react";
import { createTask } from "../services/taskService";

function TaskForm() {

    const statusMap = {
        Learning: ["Saved", "Started", "Completed"],
        Job: ["Saved", "Applied", "Interviewed", "Rejected", "Selected"],
        Project: ["Saved", "Started", "In Progress", "Completed"]
    };

    const [task, setTask] = useState({
        title:"",
        description:"",
        category:"",
        status:"",
        priority:"",
        deadline:"",
        addToCalendar: false
    });
    
    const handleChange = (e) => {
        const {name, value, type, files, checked} = e.target;

        if(type === 'checkbox'){
            setTask({...task, [name]: checked});
        }

        else if(name === 'file'){
            setTask({...task, file: files[0]});
        }

        else if(name === 'category') {
            setTask({...task, category: value, status: statusMap[value][0]});
        }
        else{
            setTask({...task, [name]: value});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const formData = new FormData();
            Object.keys(task).forEach((key) => {
                formData.append(key, task[key]);
            });

            const res = await createTask(formData);
            alert(res.message);
        }
        catch(error){
            console.log(error);
            if(error.response && error.response.data){
                alert(error.response.data.message);
            }
            else{
                alert("Server error OR network issue.");
            }
        }
    };

    return(
        <>
            <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title mb-4 text-center">
                                Create New Task
                            </h4>

                            <form onSubmit={handleSubmit}>

                                {/* Title */}
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        placeholder="Enter task title"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        name="description"
                                        className="form-control"
                                        rows="3"
                                        placeholder="Enter description"
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                {/* Category */}
                                <div className="mb-3">
                                    <label className="form-label">Category</label>
                                    <select
                                        name="category"
                                        className="form-select"
                                        value={task.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Learning">Learning</option>
                                        <option value="Project">Project</option>
                                        <option value="Job">Job</option>
                                    </select>
                                </div>

                                {/* Dynamic Status */}
                                {task.category && (
                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <select
                                            name="status"
                                            className="form-select"
                                            value={task.status}
                                            onChange={handleChange}
                                            required
                                        >
                                            {statusMap[task.category]?.map((statusOption) => (
                                                <option key={statusOption} value={statusOption}>
                                                    {statusOption}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Priority */}
                                <div className="mb-3">
                                    <label className="form-label">Priority</label>
                                    <select
                                        name="priority"
                                        className="form-select"
                                        value={task.priority}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Priority</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>

                                {/* Deadline */}
                                <div className="mb-3">
                                    <label className="form-label">Deadline</label>
                                    <input
                                        type="datetime-local"
                                        name="deadline"
                                        className="form-control"
                                        value={task.deadline}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Optional File Upload */}
                                <div className="mb-4">
                                    <label className="form-label">
                                        Upload File (Optional)
                                    </label>
                                    <input
                                        type="file"
                                        name="file"
                                        className="form-control"
                                        onChange={handleChange}
                                    />
                                    <div className="form-text">
                                        You can attach related document (optional).
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label>
                                        <input type="checkbox"
                                         name="addToCalendar"
                                         checked={task.addToCalendar}
                                         onChange={handleChange} 
                                        />
                                        Add to Google Calendar
                                    </label>
                                </div>

                                {/* Submit */}
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Create Task
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default TaskForm;