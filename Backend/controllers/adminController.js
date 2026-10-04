import User from "../models/User.js";
import Company from "../models/Company.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import asyncHandler from "../utils/asyncHandler.js";



// ------- DASHBOARD STATS -------


export const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    totalCompanies,
    totalJobs,
    totalApplications,
    latestJobs,
  ] = await Promise.all([
    User.countDocuments(),
    Company.countDocuments(),
    Job.countDocuments(),
    Application.countDocuments(),
    Job.find()
      .populate("company", "name logo")
      .sort({ createdAt: -1 })
      .limit(5),
  ]);

  return res.status(200).json({
    success: true,
    stats: {
      totalUsers,
      totalCompanies,
      totalJobs,
      totalApplications,
      latestJobs,
    },
  });
});

// -------- RECRUITER DASHBOARD --------

export const getRecruiterDashboard = asyncHandler(async (req, res) => {
  const recruiterId = req.user.id;

  const companies = await Company.find({ createdBy: recruiterId });

  const companyIds = companies.map((company) => company._id);

  const jobs = await Job.find({
    company: { $in: companyIds },
  });

  const jobIds = jobs.map((job) => job._id);

  const totalApplications = await Application.countDocuments({
    job: { $in: jobIds },
  });

  const recentApplications = await Application.find({
    job: { $in: jobIds },
  })
    .populate("job", "title")
    .populate("applicant", "name email profilePhoto")
    .sort({ createdAt: -1 })
    .limit(5);

  return res.status(200).json({
    success: true,
    dashboard: {
      totalCompanies: companies.length,
      totalJobs: jobs.length,
      totalApplications,
      recentApplications,
    },
  });
});

// -------- ADMIN ANALYTICS -------

export const getAnalytics = asyncHandler(async (req, res) => {
  const users = await User.countDocuments();
  const companies = await Company.countDocuments();
  const jobs = await Job.countDocuments();
  const applications = await Application.countDocuments();

  const pendingApplications = await Application.countDocuments({
    status: "Pending",
  });

  const acceptedApplications = await Application.countDocuments({
    status: "Accepted",
  });

  const rejectedApplications = await Application.countDocuments({
    status: "Rejected",
  });

  return res.status(200).json({
    success: true,
    analytics: {
      users,
      companies,
      jobs,
      applications,
      pendingApplications,
      acceptedApplications,
      rejectedApplications,
    },
  });
});


// -------- GET RECENT USERS -------

export const getRecentUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .limit(5);

  return res.status(200).json({
    success: true,
    users,
  });
});


// -------- GET RECENT COMPANIES -------

export const getRecentCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find()
    .sort({ createdAt: -1 })
    .limit(5);

  return res.status(200).json({
    success: true,
    companies,
  });
});