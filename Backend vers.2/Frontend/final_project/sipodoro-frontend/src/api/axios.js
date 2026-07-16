import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // The base path is defined here
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); //confirm this key matches what login saves
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;