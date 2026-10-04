import express from "express";
import {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
  uploadCompanyLogo,
} from "../controllers/companyController.js";

import { isAuthenticated, authorizeRoles } from "../middleware/authMiddleware.js";
import { createCompanyValidation } from "../validations/companyValidation.js";
import { uploadResume } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  isAuthenticated,
  authorizeRoles("admin"),
  createCompanyValidation,
  createCompany
);

router.get("/", isAuthenticated, getCompanies);

router.get("/:id", isAuthenticated, getCompany);

router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  createCompanyValidation,
  updateCompany
);

router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteCompany
);

router.post(
  "/:id/logo",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadResume.single("logo"),
  uploadCompanyLogo
);

export default router;