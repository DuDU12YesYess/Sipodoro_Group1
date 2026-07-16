import api from "./axios";

export const getCurrentFlower = () => {
    return api.get("/flowers/current");
};

export const plantSeed = (seedId) => {
    return api.post("/flowers/plant", { seed_id: seedId });
};

export const storeInInventory = () => {
    return api.post("/flowers/store");
};
