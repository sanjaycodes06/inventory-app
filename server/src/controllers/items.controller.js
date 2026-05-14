import {
  createItem,
  deleteItem,
  getItemById,
  listItems,
  updateItem,
} from "../services/items.service.js";
import { created, ok } from "../utils/ApiResponse.js";

export async function list(req, res, next) {
  try {
    const data = await listItems(req.query);
    return ok(res, { items: data.items, total: data.total, page: data.page, limit: data.limit });
  } catch (e) {
    next(e);
  }
}

export async function getOne(req, res, next) {
  try {
    const item = await getItemById(req.params.id);
    return ok(res, { item });
  } catch (e) {
    next(e);
  }
}

export async function create(req, res, next) {
  try {
    const item = await createItem(req.body);
    return created(res, { item });
  } catch (e) {
    next(e);
  }
}

export async function update(req, res, next) {
  try {
    const item = await updateItem(req.params.id, req.body);
    return ok(res, { item });
  } catch (e) {
    next(e);
  }
}

export async function remove(req, res, next) {
  try {
    await deleteItem(req.params.id);
    return ok(res, { deleted: true });
  } catch (e) {
    next(e);
  }
}
