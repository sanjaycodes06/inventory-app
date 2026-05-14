import { axiosInstance } from "./axiosInstance.js";

export const listInvoices = (params) =>
  axiosInstance.get("/billing/invoices", { params });
export const getInvoice = (id) =>
  axiosInstance.get(`/billing/invoices/${id}`);
export const createInvoice = (body) =>
  axiosInstance.post("/billing/invoices", body);
