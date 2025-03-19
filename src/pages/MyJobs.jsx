import { useContext } from "react";
import AppContext from "../context/AppContext";
import EmployerJobs from "../components/EmployerJobs";
import JobseekerJobs from "../components/JobseekerJobs";

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
