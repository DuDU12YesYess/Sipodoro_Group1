import api from "./axios";

export const buySeed = (seedId, quantity = 1) => {
    return api.post("/shop/buy", { seedId, quantity });
};

export const getAllSeeds = () => {
    return api.get("/admin/seeds");
};
