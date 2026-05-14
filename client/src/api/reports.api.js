import { axiosInstance } from "./axiosInstance.js";

export const getInventorySummary = () =>
  axiosInstance.get("/reports/inventory-summary");
export const getSalesReport = (params) =>
  axiosInstance.get("/reports/sales", { params });
