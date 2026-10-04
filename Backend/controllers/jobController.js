import Job from "../models/Job.js";
import Company from "../models/Company.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import User from "../models/User.js";

// ----- CREATE JOB ----------

export const createJob = asyncHandler(async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const {
    title,
    description,
    salary,
    location,
    jobType,
    experience,
    position,
    company,
  } = req.body;

  const companyExists = await Company.findById(company);

  if (!companyExists) {
    return res.status(404).json({
      success: false,
      message: "Company not found",
    });
  }

  const job = await Job.create({
    title,
    description,
    salary,
    location,
    jobType,
    experience,
    position,
    company,
    createdBy: req.user.id,
  });

  return res.status(201).json({
    success: true,
    message: "Job Created Successfully",
    job,
  });

});

// ------ GET ALL JOB ----------

export const getJobs = asyncHandler(async (req, res) => {
  const {
    keyword,
    location,
    jobType,
    experience,
    minSalary,
    maxSalary,
    page = 1,
    limit = 10,
    sort = "latest",
  } = req.query;

  const query = {};

  // Search
  if (keyword) {
  query.$or = [
    { title: { $regex: keyword, $options: "i" } },
    { description: { $regex: keyword, $options: "i" } },
  ];
}

  // Location
  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  // Job Type
  if (jobType) {
    query.jobType = jobType;
  }

  // Experience
  if (experience) {
    query.experience = { $lte: Number(experience) };
  }

  // Salary
  if (minSalary || maxSalary) {
    query.salary = {};

    if (minSalary) {
      query.salary.$gte = Number(minSalary);
    }

    if (maxSalary) {
      query.salary.$lte = Number(maxSalary);
    }
  }

  let sortOption = { createdAt: -1 };

  if (sort === "salary-low") {
    sortOption = { salary: 1 };
  }

  if (sort === "salary-high") {
    sortOption = { salary: -1 };
  }

  const totalJobs = await Job.countDocuments(query);

  const jobs = await Job.find(query)
    .populate("company", "name logo location")
    .populate("createdBy", "name email")
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return res.status(200).json({
  success: true,
  filters: {
    keyword: keyword || "",
    location: location || "",
    jobType: jobType || "",
    experience: experience || "",
    minSalary: minSalary || "",
    maxSalary: maxSalary || "",
    sort,
  },
  pagination: {
    totalJobs,
    currentPage: Number(page),
    totalPages: Math.ceil(totalJobs / limit),
    limit: Number(limit),
  },
  jobs,
});
});

// ------ GET SINGLE JOB ----------

export const getJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)
    .populate("company")
    .populate("createdBy", "name email");

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  return res.status(200).json({
    success: true,
    job,
  });
});

// -------- UPDATE JOB ---------

export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  Object.assign(job, req.body);

  await job.save();

  return res.status(200).json({
    success: true,
    message: "Job Updated Successfully",
    job,
  });
});

// -------- DELETE JOB --------

export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  await job.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Job Deleted Successfully",
  });
});

// --------- SAVE JOB --------

export const saveJob = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user.id);

  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  if (user.savedJobs.includes(job._id)) {
    return res.status(400).json({
      success: false,
      message: "Job already saved",
    });
  }

  user.savedJobs.push(job._id);

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Job saved successfully",
  });

});

// -------- MY JOBS --------

export const getMyJobs = asyncHandler(async (req, res) => {

  const jobs = await Job.find({
    createdBy: req.user.id,
  })
    .populate("company", "name logo")
    .sort({ createdAt: -1 });

  const jobsWithApplicants = jobs.map((job) => ({
    ...job.toObject(),
    totalApplicants: job.applications.length,
  }));

  return res.status(200).json({
    success: true,
    jobs: jobsWithApplicants,
  });

});