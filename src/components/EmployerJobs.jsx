import { useContext, useEffect, useState } from "react";
import { fetchMyPostedJobs } from "../services/api";
import AppContext from "../context/AppContext";
import JobCard from "../components/JobCard";

const EmployerJobs = () => {
  const { user, token } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const res = await fetchMyPostedJobs();
      setJobs(res.data);
      setLoading(false);
    };
    if (user?.role === "employer") {
      fetchJobs();
    }
  }, [user, token]);
  if(loading) return <p>Loading...</p>

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
