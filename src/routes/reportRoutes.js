import { Router } from "express";
import { createReport, getReportById, getReports } from "../controllers/reportController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

// Protected: student must be logged in
router.post("/", protect, createReport);

// Public: list & search
router.get("/", getReports);

// Public: single report
router.get("/:id", getReportById);

export default router;