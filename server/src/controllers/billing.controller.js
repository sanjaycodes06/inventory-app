import {
  createInvoice,
  getInvoiceById,
  listInvoices,
} from "../services/billing.service.js";
import { created, ok } from "../utils/ApiResponse.js";

export async function list(req, res, next) {
  try {
    const data = await listInvoices(req.query);
    return ok(res, {
      invoices: data.items,
      total: data.total,
      page: data.page,
      limit: data.limit,
    });
  } catch (e) {
    next(e);
  }
}

export async function getOne(req, res, next) {
  try {
    const invoice = await getInvoiceById(req.params.id);
    return ok(res, { invoice });
  } catch (e) {
    next(e);
  }
}

export async function create(req, res, next) {
  try {
    const invoice = await createInvoice(req.body);
    return created(res, { invoice });
  } catch (e) {
    next(e);
  }
}
