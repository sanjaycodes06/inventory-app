import { axiosInstance } from "./axiosInstance.js";

export const listItems = (params) => axiosInstance.get("/items", { params });
export const getItem = (id) => axiosInstance.get(`/items/${id}`);
export const createItem = (body) => axiosInstance.post("/items", body);
export const updateItem = (id, body) => axiosInstance.patch(`/items/${id}`, body);
export const deleteItem = (id) => axiosInstance.delete(`/items/${id}`);
