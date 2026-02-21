import API from "../api/api";

export const createTask = async (taskData) => {
    const res = await API.post("/tasks/create", taskData, {
        headers: {
            "Content-Type": "multipart/form-data", // to send file data
        },
    });
    return res.data;
}

export const getAllTasks = async () => {
    const res = await API.get("/tasks/get");
    return res.data;
}

export const updateTask = async(id, updateData) => {
    const res = await API.put(`/tasks/update/${id}`, updateData);
    return res.data;
}

export const deleteTask = async(id) => {
    const res = await API.delete(`/tasks/delete/${id}`);
    return res.data;
}