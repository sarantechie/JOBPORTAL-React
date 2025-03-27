import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://jobportal-api-roan.vercel.app/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized access");
          break;
        case 404:
          console.error("Resource not found");
          break;
        default:
          console.error("An error occurred:", error.response.status);
      }
    } else {
      console.error("Network error:", error.message);
    }
    return Promise.reject(error);
  }
);

export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res;
};

export const registerUser = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  delete api.defaults.headers.common["Authorization"];
};

export const fetchAllJobs = async () => {
  const res = await api.get("/jobs");
  return res;
};

export const createJob = async (jobDetails) => {
  const res = await api.post("/jobs", jobDetails);
  return res;
};

export const fetchJob = async (id) => {
  const res = await api.get(`/jobs/getJob/${id}`);
  return res;
};

export const applyForJob = async (jobId, userId) => {
  const res = await api.post("/applications", { jobId, userId });
  return res;
};

export const applicationStatus = async (jobId) => {
  const res = await api.get(`/applications/${jobId}`);
  return res;
};

export const fetchMyPostedJobs = async () => {
  const res = await api.get("/jobs/my-jobs");
  return res;
};

export const updateMyProfile = async (updateData) => {
  const res = await api.put("/auth", updateData);
  return res;
};

export const fetchJobApplications = async (jobId) => {
  const res = await api.get(`/applications/${jobId}/applications`);
  return res;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const res = await api.put(`/applications/${applicationId}/status`, {
    status,
  });
  return res;
};

export const getMyJobs = async () => {
  const res = await api.get(`/applications/myJobs`);
  return res;
};

export const uploadResume = async (resume) => {
  const res = await api.post(`/auth/upload-resume`, resume);
  return res;
};

export const fetchApplicantDetails = async (applicantId) => {
  const res = await api.get(`/auth/${applicantId}`);
  return res;
};

export const google_Login = async (googleToken) => {
  const res = await api.post("/auth/google-login", { token: googleToken });
  return res;
};

export const me = async (token) => {
  const res = await api.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};
