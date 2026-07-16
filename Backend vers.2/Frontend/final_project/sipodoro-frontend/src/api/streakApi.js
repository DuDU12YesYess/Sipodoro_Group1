import api from "./axios";

export const getStreak = () => {
    return api.get("/streak");
};
