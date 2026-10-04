import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import asyncHandler from "../utils/asyncHandler.js";

// ------- REGISTER ---------

export const register = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ------- LOGIN ---------

export const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // 1. Check user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // 3. Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });



  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ------- GET PROFILE ---------


export const getProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ------- UPDATE PROFILE ---------


export const updateProfile = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      phone,
      bio,
      skills,
      location,
      professionalRole,
      experience,
      qualification,
      college,
      specialization,
      passingYear,
      cgpa,
      currentCompany,
      currentCTC,
      expectedCTC,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name !== undefined)
      user.name = name;

    if (phone !== undefined)
      user.phone = phone;

    if (bio !== undefined)
      user.bio = bio;

    if (skills !== undefined)
      user.skills = skills;

    if (location !== undefined)
      user.location = location;

    if (professionalRole !== undefined)
      user.professionalRole = professionalRole;

    if (experience !== undefined)
      user.experience = experience;

    if (qualification !== undefined)
      user.qualification = qualification;

    if (college !== undefined)
      user.college = college;

    if (specialization !== undefined)
      user.specialization = specialization;

    if (passingYear !== undefined)
      user.passingYear = passingYear;

    if (cgpa !== undefined)
      user.cgpa = cgpa;

    if (currentCompany !== undefined)
      user.currentCompany = currentCompany;

    if (currentCTC !== undefined)
      user.currentCTC = currentCTC;

    if (expectedCTC !== undefined)
      user.expectedCTC = expectedCTC;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ------- CHANGE PASSWORD ---------


export const changePassword = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Old password is incorrect",
    });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});


// ------- LOGOUT ---------

export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({
    success: true,
    message: "Logout Successful",
  });
});


// ------- FORGOT PASSWORD ---------

export const forgotPassword = asyncHandler(async (req, res) => {

  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Generate Random Token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Save Token in DB
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Token Expiry (15 Minutes)
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  await user.save();

  // Reset URL
  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

  const message = `
Password Reset Request

Click the link below to reset your password:

${resetUrl}

This link will expire in 15 minutes.
`;

  await sendEmail({
    email: user.email,
    subject: "Nexora Password Reset",
    message,
  });

  return res.status(200).json({
    success: true,
    message: "Password reset email sent successfully.",
  });

});

// ------- RESET PASSWORD ---------

export const resetPassword = asyncHandler(async (req, res) => {

  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired reset token",
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  user.password = hashedPassword;

  user.resetPasswordToken = "";
  user.resetPasswordExpire = undefined;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password reset successful",
  });

});

// ------- UPLOAD RESUME ---------

export const uploadUserResume = asyncHandler(async (req, res) => {
  console.log("=== RESUME UPLOAD DEBUG START ===");
  console.log("req.file:", req.file);
  console.log("req.user:", req.user);

  try {
    if (!req.file) {
      console.log("ERROR: req.file is missing!");
      return res.status(400).json({
        success: false,
        message: "No file received",
      });
    }

    const user = await User.findById(req.user.id);
    console.log("user found:", user ? user.email : "NOT FOUND");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.resume = req.file.path;
    await user.save();

    console.log("=== RESUME UPLOAD SUCCESS ===");

    return res.status(200).json({
      success: true,
      message: "Resume Uploaded Successfully",
      resume: user.resume,
    });
  } catch (error) {
    console.log("=== CATCH BLOCK ERROR ===");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ------- UPLOAD PROFILE PHOTO  ---------

export const uploadProfilePhoto = asyncHandler(async (req, res) => {

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload profile photo",
    });
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user.profilePhoto = req.file.path;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Profile photo uploaded successfully",
    profilePhoto: user.profilePhoto,
  });

});


