import { useContext, useEffect, useState } from "react";
import { fetchMyPostedJobs } from "../services/api";
import AppContext from "../context/AppContext";
import JobCard from "../components/JobCard";

const EmployerJobs = () => {
  const { user, token } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetchMyPostedJobs();
      setJobs(res.data);
    };
    if (user?.role === "employer") {
      fetchJobs();
    }
  }, [user, token]);

  return (
    <div>
      <h2>Posted Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="job-list">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} showDate={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployerJobs;
