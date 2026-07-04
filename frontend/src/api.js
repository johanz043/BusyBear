// Bridges React (Frontend) to Flask API (Backend) through Axios (here) by sending requests from React
// HTTP is the bridge, Axios is the messenger that makes sending HTTP requests easier

import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;