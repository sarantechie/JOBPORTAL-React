import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import JobCard from "../components/JobCard"; 
import "../styles/Home.css";

function Home() {
  const { jobs, fetchJobs } = useContext(AppContext);

  useEffect(() => {
    fetchJobs();
  }, []);

  if (!jobs) return <p>Loading...</p>
  return (
    <div className="home-container">
      <h1>Job Listings</h1>
      <div className="job-list">
        {jobs?.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default Home;
