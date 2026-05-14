import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import itemsRoutes from "./routes/items.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import billingRoutes from "./routes/billing.routes.js";
import reportsRoutes from "./routes/reports.routes.js";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/reports", reportsRoutes);

app.use(errorHandler);

export default app;
