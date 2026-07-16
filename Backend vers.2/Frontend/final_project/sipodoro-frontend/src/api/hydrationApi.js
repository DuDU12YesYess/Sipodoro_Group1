import api from "./axios";

export const checkInWater = () => {
    return api.post("/hydration/check-in");
};

export const getAllHydrationLogs = () => {
    return api.get("/admin/hydration-logs");
};
