import { useContext } from "react";
import AppContext from "../context/AppContext";
import EmployerJobs from "./MyJobs/Employer/EmployerJobs";
import JobseekerJobs from "./MyJobs/JobSeeker/JobseekerJobs";

const MyJobs = () => {
  const { user } = useContext(AppContext);
  return (
    <>
      {user && user.role === "employer" ? (
        <EmployerJobs />
      ) : user && user.role === "jobseeker" ? (
        <JobseekerJobs />
      ) : null}
    </>
  );
};

export default MyJobs;
