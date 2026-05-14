import api from "./client.js";

export async function fetchItems(params = {}) {
  const { data } = await api.get("/api/items", { params });
  return data.data;
}

export async function fetchItem(id) {
  const { data } = await api.get(`/api/items/${id}`);
  return data.data.item;
}

export async function createItem(body) {
  const { data } = await api.post("/api/items", body);
  return data.data.item;
}

export async function updateItem(id, body) {
  const { data } = await api.patch(`/api/items/${id}`, body);
  return data.data.item;
}
