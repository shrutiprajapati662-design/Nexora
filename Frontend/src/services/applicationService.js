import api from "../api/axios";

// Apply Job
export const applyJob = async (jobId) => {
  const response = await api.post(`/applications/apply/${jobId}`);
  return response.data;
};

// My Applications
export const getMyApplications = async () => {
  const response = await api.get("/applications/my");
  return response.data;
};



// Dashboard Summary
export const getDashboardSummary = async () => {
  const response = await api.get("/applications/dashboard/summary");
  return response.data;
};

// Dashboard Stats
export const getDashboardStats = async () => {
  const response = await api.get("/applications/dashboard/stats");
  return response.data;
};

// Recent Activity
export const getRecentActivity = async () => {
  const response = await api.get("/applications/dashboard/activity");
  return response.data;
};

// Withdraw Application
export const withdrawApplication = async (applicationId) => {
  const response = await api.delete(
    `/applications/withdraw/${applicationId}`
  );
  return response.data;
};