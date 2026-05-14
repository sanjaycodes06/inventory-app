import { Router } from "express";
import * as items from "../controllers/items.controller.js";

const router = Router();

router.get("/", items.list);
router.get("/:id", items.getOne);
router.post("/", items.create);
router.patch("/:id", items.update);
router.delete("/:id", items.remove);

export default router;
