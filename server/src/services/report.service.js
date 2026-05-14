import { Item } from "../models/Item.model.js";
import { Invoice } from "../models/Invoice.model.js";

export async function inventorySummary() {
  const [items, invoices] = await Promise.all([
    Item.countDocuments(),
    Invoice.countDocuments({ status: "paid" }),
  ]);
  return { itemCount: items, paidInvoices: invoices };
}

export async function salesReport({ from, to }) {
  const filter = {};
  if (from || to) {
    filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) filter.createdAt.$lte = new Date(to);
  }
  const agg = await Invoice.aggregate([
    { $match: filter },
    { $group: { _id: "$status", count: { $sum: 1 }, revenue: { $sum: "$total" } } },
  ]);
  return agg;
}
