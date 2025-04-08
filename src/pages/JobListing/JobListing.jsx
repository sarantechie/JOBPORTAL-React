
import React, { useContext } from "react";
import "./JobListings.css";
import { Link } from "react-router-dom";
import JobCard from "../../components/JobCard/JobCard";
import AppContext from "../../context/AppContext";

const JobListings = () => {
  const {jobs} = useContext(AppContext);

  return (
    <section className="job-listings">
      <div className="container">
        <div className="section-header">
          <h2>Recent Job Listings</h2>
          <Link to="/jobs" className="view-all">
            View All
          </Link>
        </div>

        <div className="jobs-grid">
          {jobs.slice(0, 6).map((job,index) => (
            <JobCard key={job.id} job={job} index={index}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
