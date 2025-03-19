import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { applicationStatus, applyForJob, fetchJob } from "../services/api";
import AppContext from "../context/AppContext";
import "../styles/JobDetails.css";
import EmployerApplications from "../components/EmployerApplications";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { user, token } = useContext(AppContext);
  const [applied, setApplied] = useState(false);
  const [ViewApplications, setViewApplications] = useState(false);

  const checkApplicationStatus = async () => {
    if (user?.role === "jobseeker") {
      try {
        const res = await applicationStatus(id);
        setApplied(res.data.applied);
      } catch (error) {
        console.error("Error checking application status:", error);
      }
    }
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await fetchJob(id);
      setJob(res.data);
    };

    fetch();
    checkApplicationStatus();
  }, [id, user, token]);

  const applyJob = async () => {
    if (!user) {
      alert("Login to apply");
      return;
    }
    if (user?.role === "jobseeker") {
      await applyForJob(id, user._id);
      alert("Applied..!");
      checkApplicationStatus();
      return;
    }
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="job-details-container">
      <h1 className="job-title">{job.title}</h1>
      <p className="job-info">
        <strong>Description:</strong> {job.description}
      </p>
      <p className="job-info">
        <strong>Location:</strong> {job.location}
      </p>
      <p className="job-info">
        <strong>Salary:</strong> {job.salary}
      </p>
      <p className="job-info">
        <strong>Skills Required:</strong> {job.skills}
      </p>
      {user?.role !== "employer" && (
        <button
          onClick={applyJob}
          className={`apply-button ${applied ? "disabled" : "active"}`}
          disabled={applied}
        >
          {applied ? "Already Applied" : "Apply"}
        </button>
      )}
      {user?.role === "employer" && user?._id === job?.employerId && (
        <div>
          <button onClick={() => setViewApplications(true)}>
            View Applications
          </button>
        </div>
      )}
      {ViewApplications && <EmployerApplications jobId={id} />}
    </div>
  );
}

export default JobDetails;
