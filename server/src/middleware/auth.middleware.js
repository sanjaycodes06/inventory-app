import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

export function verifyAccessToken(req, _res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return next(new ApiError(401, "Unauthorized"));
  try {
    req.user = jwt.verify(token, env.JWT_ACCESS_SECRET);
    next();
  } catch {
    next(new ApiError(401, "Invalid token"));
  }
}

export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.user?.role || !roles.includes(req.user.role)) {
      return next(new ApiError(403, "Forbidden"));
    }
    next();
  };
}
