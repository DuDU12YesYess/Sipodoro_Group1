import api from "./axios";

export const register = (userData) => {
    // Since your axios base URL is likely '/api', 
    // the request will become '/api/auth/register'
    return api.post("/auth/register", userData);
};

export const login = (userData) => {
    // This will become '/api/auth/login'
    return api.post("/auth/login", userData);
};