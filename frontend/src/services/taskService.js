// Asks backend fro tasks

import api from "../api";

export const getTasks = () => {
    return api.get("/tasks");
};