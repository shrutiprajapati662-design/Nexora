import api from "./api";

// ---------- Register ----------

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// ---------- Login ----------

export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// ---------- Logout ----------

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  localStorage.removeItem("token");
  return response.data;
};
// ---------- Current User ----------

export const getCurrentUser = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};


// ---------- Update Profile ----------

export const updateProfile = async (profileData) => {

  const response = await api.put("/auth/profile", profileData);

  return response.data;

};

// ---------- Change Password ----------

export const changePassword = async (passwordData) => {

    const response = await api.put(
        "/auth/change-password",
        passwordData
    );

    return response.data;

};


// ---------- Upload Profile Photo ----------

export const uploadProfilePhoto = async (formData) => {

  const response = await api.post(
    "/auth/profile-photo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};


// ---------- Upload Resume ----------

export const uploadResume = async (formData) => {

  const response = await api.post(
    "/auth/resume",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};