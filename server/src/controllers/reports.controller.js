import { inventorySummary, salesReport } from "../services/report.service.js";
import { ok } from "../utils/ApiResponse.js";

export async function inventorySummaryHandler(_req, res, next) {
  try {
    const data = await inventorySummary();
    return ok(res, data);
  } catch (e) {
    next(e);
  }
}

export async function salesReportHandler(req, res, next) {
  try {
    const data = await salesReport(req.query);
    return ok(res, { breakdown: data });
  } catch (e) {
    next(e);
  }
}
