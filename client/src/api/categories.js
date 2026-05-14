import axios from "axios";
import api from "./client.js";

const baseURL = () => import.meta.env.VITE_API_URL ?? "";

/** Public list (no auth). */
export async function fetchCategories() {
  const { data } = await axios.get(`${baseURL()}/api/categories`);
  if (!data.success) throw new Error(data.message || "Failed to load categories");
  return data.data.categories;
}

export async function createCategory(name) {
  const { data } = await api.post("/api/categories", { name });
  if (!data.success) throw new Error(data.message || "Failed to create category");
  return data.data.category;
}
