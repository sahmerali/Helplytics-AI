import { Router } from "express";
import { getRecommendations } from "../controllers/match.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

// GET /api/matches/recommendations — Get AI match recommendations (protected)
router.get("/recommendations", authMiddleware, getRecommendations);

export default router;
