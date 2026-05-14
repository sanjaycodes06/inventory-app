import { Router } from "express";
import { z } from "zod";
import * as auth from "../controllers/auth.controller.js";
import { validateBody } from "../middleware/validate.middleware.js";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["admin", "staff"]).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

const router = Router();

router.post("/register", validateBody(registerSchema), auth.register);
router.post("/login", validateBody(loginSchema), auth.login);
router.post("/refresh", validateBody(refreshSchema), auth.refresh);
router.post("/logout", auth.logout);

export default router;
