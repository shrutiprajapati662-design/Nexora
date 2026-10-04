import api from "./api";

// ---------- Get All Companies ----------

export const getCompanies = async () => {
  const response = await api.get("/companies");
  return response.data;
};

// ---------- Get Single Company ----------

export const getCompany = async (id) => {
  const response = await api.get(`/companies/${id}`);
  return response.data;
};

// ---------- Create Company ----------

export const createCompany = async (companyData) => {
  const response = await api.post(
    "/companies/create",
    companyData
  );

  return response.data;
};

// ---------- Update Company ----------

export const updateCompany = async (id, companyData) => {
  const response = await api.put(
    `/companies/${id}`,
    companyData
  );

  return response.data;
};

// ---------- Delete Company ----------

export const deleteCompany = async (id) => {
  const response = await api.delete(
    `/companies/${id}`
  );

  return response.data;
};

// ---------- Upload Company Logo ----------

export const uploadCompanyLogo = async (
  id,
  formData
) => {
  const response = await api.post(
    `/companies/${id}/logo`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};