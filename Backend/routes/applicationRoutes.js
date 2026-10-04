import express from "express";
import {
  applyJob,
  getMyApplications,
  getApplicants,
  updateApplicationStatus,
  getDashboardStats,
  getDashboardSummary,
  getRecentActivity,
  withdrawApplication,
} from "../controllers/applicationController.js";

import { isAuthenticated, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// User
router.post("/apply/:id", isAuthenticated, applyJob);
router.get("/my", isAuthenticated, getMyApplications);

// Recruiter/Admin
router.get(
  "/applicants/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  getApplicants
);

router.put(
  "/status/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateApplicationStatus
);

router.get(
  "/dashboard/stats",
  isAuthenticated,
  getDashboardStats
);

router.get(
  "/dashboard/summary",
  isAuthenticated,
  getDashboardSummary
);

router.get(
  "/dashboard/activity",
  isAuthenticated,
  getRecentActivity
);

router.delete(
  "/withdraw/:id",
  isAuthenticated,
  withdrawApplication
);

export default router;