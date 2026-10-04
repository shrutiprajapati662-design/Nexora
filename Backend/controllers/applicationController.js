import Application from "../models/Application.js";
import Job from "../models/Job.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";

// -------- APPLY JOB --------

export const applyJob = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  const alreadyApplied = await Application.findOne({
    job: id,
    applicant: req.user.id,
  });

  if (alreadyApplied) {
    return res.status(400).json({
      success: false,
      message: "Already applied",
    });
  }

  const application = await Application.create({
    job: id,
    applicant: req.user.id,
  });

  job.applications.push(application._id);
  await job.save();

  const user = await User.findById(req.user.id);
  user.applications.push(application._id);
  await user.save();

  return res.status(201).json({
    success: true,
    message: "Applied Successfully",
  });
});

// -------- MY APLLICATIONS -----------

export const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({
    applicant: req.user.id,
  })
    .populate({
      path: "job",
      populate: {
        path: "company",
        select: "name logo location",
      },
    })
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    totalApplications: applications.length,
    applications,
  });
});

// ---------- GET APPLICANTS --------

export const getApplicants = asyncHandler(async (req, res) => {
  const applications = await Application.find({
    job: req.params.id,
  })
    .populate(
      "applicant",
      "name email phone location skills bio resume profilePhoto"
    )
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    totalApplicants: applications.length,
    applications,
  });
});

// ---------- UPDATE STATUS  --------

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const application = await Application.findById(req.params.id);

  if (!application) {
    return res.status(404).json({
      success: false,
      message: "Application not found",
    });
  }

  application.status = status;

  await application.save();

  return res.status(200).json({
    success: true,
    message: "Application status updated",
  });
});


// ---------- DASHBOARD STATUS  --------

export const getDashboardStats = asyncHandler(async (req, res) => {
  const applications = await Application.find({
    applicant: req.user.id,
  });

  const stats = {
    totalApplications: applications.length,
    pending: applications.filter(a => a.status === "Pending").length,
    selected: applications.filter(a => a.status === "Selected").length,
    rejected: applications.filter(a => a.status === "Rejected").length,
  };

  return res.status(200).json({
    success: true,
    stats,
  });
});


// ---------- DASHBOARD SUMMARY  --------


export const getDashboardSummary = asyncHandler(async (req, res) => {
  const applications = await Application.find({
    applicant: req.user.id,
  })
    .populate({
      path: "job",
      select: "title location salary jobType",
      populate: {
        path: "company",
        select: "name logo",
      },
    })
    .sort({ createdAt: -1 });

  const summary = {
    totalApplications: applications.length,
    pending: applications.filter(a => a.status === "Pending").length,
    selected: applications.filter(a => a.status === "Selected").length,
    rejected: applications.filter(a => a.status === "Rejected").length,
    recentApplications: applications.slice(0, 5),
  };

  return res.status(200).json({
    success: true,
    summary,
  });
});


// ---------- GET RECENT ACTIVITY  --------

export const getRecentActivity = asyncHandler(async (req, res) => {
  const recentApplications = await Application.find({
    applicant: req.user.id,
  })
    .populate({
      path: "job",
      select: "title location jobType",
      populate: {
        path: "company",
        select: "name logo",
      },
    })
    .sort({ createdAt: -1 })
    .limit(10);

  return res.status(200).json({
    success: true,
    recentApplications,
  });
});

// ------- WITHDRAW APPLICATION -----------

export const withdrawApplication = asyncHandler(async (req, res) => {

  const application = await Application.findOne({
    _id: req.params.id,
    applicant: req.user.id,
  });

  if (!application) {
    return res.status(404).json({
      success: false,
      message: "Application not found",
    });
  }

  application.status = "Withdrawn";

  await application.save();

  return res.status(200).json({
    success: true,
    message: "Application withdrawn successfully",
  });

});