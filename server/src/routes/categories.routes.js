import { Router } from "express";
import { Category } from "../models/Category.model.js";
import { ok } from "../utils/ApiResponse.js";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 }).lean();
    return ok(res, { categories });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const cat = await Category.create(req.body);
    return ok(res, { category: cat });
  } catch (e) {
    next(e);
  }
});

export default router;
