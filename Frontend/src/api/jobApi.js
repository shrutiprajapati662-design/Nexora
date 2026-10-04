import api from "./api";

// ---------- Get All Jobs ----------

export const getJobs = async (params = {}) => {
  const response = await api.get("/jobs", { params });
  return response.data;
};

// ---------- Get Single Job ----------

export const getJob = async (id) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

// ---------- Save Job ----------

export const saveJob = async (id) => {
  const response = await api.post(`/jobs/${id}/save`);
  return response.data;
};

// ---------- Create Job ----------

export const createJob = async (jobData) => {

  const response = await api.post(
    "/jobs/create",
    jobData
  );

  return response.data;

};

// ---------- Update Job ----------

export const updateJob = async (
  id,
  jobData
) => {

  const response = await api.put(
    `/jobs/${id}`,
    jobData
  );

  return response.data;

};

// ---------- Delete Job ----------

export const deleteJob = async (id) => {

  const response = await api.delete(
    `/jobs/${id}`
  );

  return response.data;

};
