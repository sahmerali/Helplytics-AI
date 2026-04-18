// ============================================
// Auth Routes
// Public: register, login
// Protected: getMe (requires JWT)
// ============================================

import { Router } from "express";
import { register, login, getMe, onboarding } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

// POST /api/auth/register — Create a new account
router.post("/register", register);

// POST /api/auth/login — Login with email & password
router.post("/login", login);

// GET /api/auth/me — Get current user's profile (protected)
router.get("/me", authMiddleware, getMe);

// PUT /api/auth/onboarding — Complete user onboarding (protected)
router.put("/onboarding", authMiddleware, onboarding);

export default router;
