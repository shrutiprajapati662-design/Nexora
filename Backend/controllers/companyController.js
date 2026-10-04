import Company from "../models/Company.js";
import { validationResult } from "express-validator";
import asyncHandler from "../utils/asyncHandler.js";
// import cloudinary from "../config/cloudinary.js";


export const createCompany = asyncHandler(async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { name, description, website, location } = req.body;

  const companyExists = await Company.findOne({ name });

  if (companyExists) {
    return res.status(400).json({
      success: false,
      message: "Company already exists",
    });
  }

  const company = await Company.create({
    name,
    description,
    website,
    location,
    createdBy: req.user.id,
  });

  return res.status(201).json({
    success: true,
    message: "Company Created Successfully",
    company,
  });

});

export const getCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find().populate(
    "createdBy",
    "name email"
  );

  return res.status(200).json({
    success: true,
    count: companies.length,
    companies,
  });
});

export const getCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id).populate(
    "createdBy",
    "name email"
  );

  if (!company) {
    return res.status(404).json({
      success: false,
      message: "Company not found",
    });
  }

  return res.status(200).json({
    success: true,
    company,
  });
});

export const updateCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return res.status(404).json({
      success: false,
      message: "Company not found",
    });
  }

  Object.assign(company, req.body);

  await company.save();

  return res.status(200).json({
    success: true,
    message: "Company Updated Successfully",
    company,
  });
});

export const deleteCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return res.status(404).json({
      success: false,
      message: "Company not found",
    });
  }

  await company.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Company Deleted Successfully",
  });
});

export const uploadCompanyLogo = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return res.status(404).json({
      success: false,
      message: "Company not found",
    });
  }

  company.logo = req.file.path;

  await company.save();

  return res.status(200).json({
    success: true,
    message: "Company Logo Uploaded Successfully",
    logo: company.logo,
  });
});