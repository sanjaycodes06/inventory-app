import { axiosInstance } from "./axiosInstance.js";

export const login = (body) => axiosInstance.post("/auth/login", body);
export const register = (body) => axiosInstance.post("/auth/register", body);
export const refresh = (body) => axiosInstance.post("/auth/refresh", body);
export const logout = () => axiosInstance.post("/auth/logout");
