import { Item } from "../models/Item.model.js";
import { ApiError } from "../utils/ApiError.js";
import { paginate } from "../utils/paginate.js";

const CREATE_FIELDS = [
  "name",
  "sku",
  "quantity",
  "lowStockThreshold",
  "category",
  "itemType",
  "hardwareFamily",
  "description",
  "brand",
  "model",
  "manufacturerPartNumber",
  "unit",
  "storageLocation",
];

function pickItemPayload(body) {
  const payload = {};
  for (const k of CREATE_FIELDS) {
    if (body[k] === undefined || body[k] === "") continue;
    payload[k] = body[k];
  }
  if (payload.quantity !== undefined) payload.quantity = Math.max(0, Number(payload.quantity) || 0);
  if (payload.lowStockThreshold !== undefined) {
    payload.lowStockThreshold = Math.max(0, Number(payload.lowStockThreshold) || 0);
  }
  if (payload.sku === undefined) delete payload.sku;
  return payload;
}

export async function listItems(query) {
  const { page, limit, search } = query;
  let filter = {};
  if (search?.trim()) {
    const safe = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(safe, "i");
    filter = {
      $or: [
        { name: re },
        { sku: re },
        { brand: re },
        { model: re },
        { manufacturerPartNumber: re },
        { description: re },
        { storageLocation: re },
      ],
    };
  }
  return paginate(Item, filter, {
    page: Number(page) || 1,
    limit: Math.min(Number(limit) || 50, 200),
    populate: { path: "category", select: "name" },
  });
}

export async function getItemById(id) {
  const item = await Item.findById(id).populate("category", "name").lean();
  if (!item) throw new ApiError(404, "Item not found");
  return item;
}

export async function createItem(body) {
  const payload = pickItemPayload(body);
  if (!payload.name) throw new ApiError(400, "Name is required");
  return Item.create(payload);
}

export async function updateItem(id, body) {
  const payload = pickItemPayload(body);
  let item;
  if (Object.keys(payload).length > 0) {
    item = await Item.findByIdAndUpdate(id, { $set: payload }, { new: true, runValidators: true }).populate(
      "category",
      "name"
    );
  } else {
    item = await Item.findById(id).populate("category", "name");
  }
  if (!item) throw new ApiError(404, "Item not found");
  return item;
}

export async function deleteItem(id) {
  const item = await Item.findByIdAndDelete(id);
  if (!item) throw new ApiError(404, "Item not found");
  return item;
}

export async function listLowStock() {
  return Item.find({
    $expr: { $lte: ["$quantity", "$lowStockThreshold"] },
  }).lean();
}
