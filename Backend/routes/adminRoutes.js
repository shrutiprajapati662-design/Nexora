import express from "express";
import { getDashboardStats,
    getRecruiterDashboard,
    getAnalytics,
    getRecentUsers,
    getRecentCompanies,
        } from "../controllers/adminController.js";
import { isAuthenticated, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  isAuthenticated,
  authorizeRoles("admin"),
  getDashboardStats,
  

);

router.get(
  "/recruiter-dashboard",
  isAuthenticated,
  authorizeRoles("admin"),
  getRecruiterDashboard,
   
);

router.get(
  "/analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getAnalytics,
  
);

router.get(
  "/recent-users",
  isAuthenticated,
  authorizeRoles("admin"),
  getRecentUsers
);

router.get(
  "/recent-companies",
  isAuthenticated,
  authorizeRoles("admin"),
  getRecentCompanies
);

export default router;
