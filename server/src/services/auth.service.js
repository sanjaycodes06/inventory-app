import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";

export async function registerUser({ email, password, role }) {
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(409, "Email already registered");
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash, role });
  return user;
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, "Invalid credentials");
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) throw new ApiError(401, "Invalid credentials");
  return user;
}

export function signAccessToken(user) {
  return jwt.sign(
    { sub: user.id, role: user.role },
    env.JWT_ACCESS_SECRET,
    { expiresIn: env.ACCESS_TOKEN_TTL }
  );
}

export function signRefreshToken(user) {
  return jwt.sign({ sub: user.id }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.REFRESH_TOKEN_TTL,
  });
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
}
