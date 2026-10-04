import express from "express";
import { uploadResume } from "../middleware/uploadMiddleware.js";

import {
    register,
    login,
    getProfile,
    updateProfile,
    changePassword,
    logout,
    uploadUserResume,
    uploadProfilePhoto,
     forgotPassword,
    resetPassword,
} from "../controllers/authController.js";

import {
    registerValidation,
    loginValidation,
    changePasswordValidation,
} from "../validations/authValidation.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/profile", isAuthenticated, getProfile);
router.put("/profile", isAuthenticated, updateProfile);
router.put(
  "/change-password",
  isAuthenticated,
  changePasswordValidation,
  changePassword
);

router.post("/logout", isAuthenticated, logout);

router.post(
  "/resume",
  isAuthenticated,
  uploadResume.single("resume"),
  uploadUserResume
);

router.post(
  "/profile-photo",
  isAuthenticated,
  uploadResume.single("profilephoto"),
  uploadProfilePhoto
);

router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

export default router;

