import { ApiError } from "../utils/ApiError.js";

export function errorHandler(err, _req, res, _next) {
  const status = err instanceof ApiError ? err.status : 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ success: false, message });
}
