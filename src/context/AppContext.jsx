import { createContext, useState, useEffect } from "react";
import {
  fetchAllJobs,
  google_Login,
  loginUser,
  me,
  updateMyProfile,
} from "../services/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const fetch = async () => {
      if (token) {
        const res = await me(token);
        setUser(res.data);
      }
    };
    fetch();
  }, [token]);

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const googleLogin = async (googleToken) => {
    try {
      const res = await google_Login(googleToken);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (error) {
      console.error("Full Google login error:", {
        response: error.response?.data,
        message: error.message,
        config: error.config,
      });
      alert("Google authentication failed");
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const res = await updateMyProfile(updatedData);
      setUser(res.data);
      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Error updating profile");
    }
  };

  const logout = (navigate) => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    window.location.reload();
  };

  const fetchJobs = async () => {
    const res = await fetchAllJobs();
    setJobs(res.data);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        googleLogin,
        login,
        logout,
        jobs,
        fetchJobs,
        updateProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
