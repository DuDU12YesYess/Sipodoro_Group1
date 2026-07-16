import api from "./axios";

export const getWallet = () => {
    return api.get("/coins/wallet");
};

export const getInventory = () => {
    return api.get("/inventory");
};
