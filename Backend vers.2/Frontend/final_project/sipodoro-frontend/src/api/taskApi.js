import api from "./axios";

export const getTasks = () => {
    // This will now request: http://localhost:5000/api/tasks
    return api.get("/tasks");
};

export const createTask = (task) => {
    return api.post("/tasks", task);
};

export const updateTask = (id, task) => {
    return api.put(`/tasks/${id}`, task);
};

export const deleteTask = (id) => {
    return api.delete(`/tasks/${id}`);
};
