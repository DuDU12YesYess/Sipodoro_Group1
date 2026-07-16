import api from "./axios";

export const getGarden = () => {
    return api.get("/garden");
};

export const addFlowerToGarden = () => {
    return api.post("/garden/add");
};

export const getAllGardens = () => {
    return api.get("/admin/gardens");
};
