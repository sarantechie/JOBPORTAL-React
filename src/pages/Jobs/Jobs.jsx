import { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import JobCard from "../../components/JobCard/JobCard"; 
import "../Home/Home.css";

function Jobs() {


  const { jobs, fetchJobs } = useContext(AppContext);
  useEffect(() => {
    fetchJobs();
  }, []);

  if (!jobs) return <p>Loading...</p>
  return (

<section className="job-listings">
<div className="container">
  <div className="section-header">
    <h2>All Jobs</h2>
  </div>
  
  <div className="jobs-grid">
    {jobs.length === 0 && <p>No jobs available</p>}
    {jobs.map((job,index) => (
      <JobCard key={job._id} job={job} index={index} />
    ))}
  </div>
</div>
</section>
);
};

export default Jobs;
