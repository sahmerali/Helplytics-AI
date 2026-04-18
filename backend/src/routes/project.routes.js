import { Router } from "express";
import { getProjects, createProject, getProjectById, updateProjectStatus } from "../controllers/project.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getProjects);
router.post("/", authMiddleware, createProject);
router.get("/:id", authMiddleware, getProjectById);
router.patch("/:id/status", authMiddleware, updateProjectStatus);

export default router;
