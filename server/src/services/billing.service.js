import { Invoice } from "../models/Invoice.model.js";
import { ApiError } from "../utils/ApiError.js";
import { paginate } from "../utils/paginate.js";

function calcTotal(lines = []) {
  return lines.reduce((sum, l) => sum + (l.quantity || 0) * (l.unitPrice || 0), 0);
}

export async function listInvoices(query) {
  const { page, limit } = query;
  return paginate(Invoice, {}, { page: Number(page) || 1, limit: Number(limit) || 20 });
}

export async function getInvoiceById(id) {
  const inv = await Invoice.findById(id);
  if (!inv) throw new ApiError(404, "Invoice not found");
  return inv;
}

export async function createInvoice(body) {
  const total = calcTotal(body.lines);
  const number = `INV-${Date.now()}`;
  return Invoice.create({ ...body, total, number });
}
