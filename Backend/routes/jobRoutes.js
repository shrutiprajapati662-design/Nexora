import express from "express";

import {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  saveJob,
  getMyJobs,

} from "../controllers/jobController.js";

import {
  isAuthenticated,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

import { createJobValidation } from "../validations/jobValidation.js";

const router = express.Router();

router.post(
  "/create",
  isAuthenticated,
  authorizeRoles("admin"),
  createJobValidation,
  createJob
);

router.get(
  "/my",
  isAuthenticated,
  authorizeRoles("admin"),
  getMyJobs
);

router.get("/", isAuthenticated, getJobs);

router.get("/:id", isAuthenticated, getJob);

router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  createJobValidation,
  updateJob
);

router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteJob
);

router.post(
  "/:id/save",
  isAuthenticated,
  saveJob
);

export default router;