import { Router } from "express";
import { verifyAccessToken } from "../middleware/auth.middleware.js";
import * as billing from "../controllers/billing.controller.js";

const router = Router();

router.use(verifyAccessToken);
router.get("/invoices", billing.list);
router.get("/invoices/:id", billing.getOne);
router.post("/invoices", billing.create);

export default router;
