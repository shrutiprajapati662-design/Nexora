import api from "../api/axios";

// Create Job
export const createJob = async (jobData) => {
  const response = await api.post("/jobs/create", jobData);
  return response.data;
};

// My Jobs
export const getMyJobs = async () => {
  const response = await api.get("/jobs/my");
  return response.data;
};

// Single Job
export const getJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

// Update Job
export const updateJob = async (id, jobData) => {
  const response = await api.put(`/jobs/update/${id}`, jobData);
  return response.data;
};

// Delete Job
export const deleteJob = async (id) => {
  const response = await api.delete(`/jobs/delete/${id}`);
  return response.data;
};

// Applicants
export const getApplicants = async (jobId) => {
  const response = await api.get(`/applications/applicants/${jobId}`);
  return response.data;
};

// Update Application Status
export const updateApplicationStatus = async (
  applicationId,
  status
) => {
  const response = await api.patch(
    `/applications/status/${applicationId}`,
    { status }
  );

  return response.data;
};