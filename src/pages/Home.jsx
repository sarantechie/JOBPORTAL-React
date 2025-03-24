import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import AppContext from "../context/AppContext";
import JobCard from "../components/JobCard";
import "../styles/Home.css";

function Home() {
  const { fetchJobs } = useContext(AppContext);

  const {
    data: jobs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["jobs"],     queryFn: fetchJobs,
  });

  if (isLoading) {
    return <div className="home-container">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="home-container">
        Error fetching jobs: {error.message}
      </div>
    );
  }

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