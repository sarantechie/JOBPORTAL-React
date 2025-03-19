import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import EmployerProfile from "../components/EmployerProfile";
import JobSeekerProfile from "../components/JobSeekerProfile";

function Profile() {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/"); 
    }
  }, [user, navigate]);

  return (
    <div>
      <h3>Welcome, {user?.name}</h3>
      {user?.role === "employer" && <EmployerProfile />}
      {user?.role === "jobseeker" && <JobSeekerProfile />}
      <button
        onClick={async() => {
          await logout();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
