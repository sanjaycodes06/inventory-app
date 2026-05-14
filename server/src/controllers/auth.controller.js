import { User } from "../models/User.model.js";
import {
  loginUser,
  registerUser,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../services/auth.service.js";
import { ok } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export async function register(req, res, next) {
  try {
    const user = await registerUser(req.body);
    return ok(res, {
      accessToken: signAccessToken(user),
      refreshToken: signRefreshToken(user),
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (e) {
    next(e);
  }
}

export async function login(req, res, next) {
  try {
    const user = await loginUser(req.body);
    return ok(res, {
      accessToken: signAccessToken(user),
      refreshToken: signRefreshToken(user),
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (e) {
    next(e);
  }
}

export async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new ApiError(400, "refreshToken required");
    const payload = verifyRefreshToken(refreshToken);
    const user = await User.findById(payload.sub);
    if (!user) throw new ApiError(401, "Invalid refresh");
    return ok(res, { accessToken: signAccessToken(user) });
  } catch (e) {
    next(e instanceof ApiError ? e : new ApiError(401, "Invalid refresh"));
  }
}

export async function logout(_req, res) {
  return ok(res, { loggedOut: true });
}
