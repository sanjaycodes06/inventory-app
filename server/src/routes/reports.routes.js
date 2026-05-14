import { Router } from "express";
import { verifyAccessToken } from "../middleware/auth.middleware.js";
import * as reports from "../controllers/reports.controller.js";

const router = Router();

router.use(verifyAccessToken);
router.get("/inventory-summary", reports.inventorySummaryHandler);
router.get("/sales", reports.salesReportHandler);

export default router;
