import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import EmployerProfile from "../components/EmployerProfile";
import JobSeekerProfile from "../components/JobSeekerProfile";

function Profile() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      {user?.role === "employer" && <EmployerProfile />}
      {user?.role === "jobseeker" && <JobSeekerProfile />}
    </>
  );
}

export default Profile;
