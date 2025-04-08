import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  applicationStatus,
  applyForJob,
  fetchJob,
} from "../../services/api";
import AppContext from "../../context/AppContext";
import "./JobDetails.css";
import EmployerApplications from "../../components/EmployerApplications/EmployerApplications";

function JobDetails() {
  const { id } = useParams();
  const { user } = useContext(AppContext);
  const queryClient = useQueryClient();
  const [viewApplications, setViewApplications] = useState(false);

  const { data: job, isLoading: jobLoading } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJob(id).then((res) => res.data),
  });

  const { data: applied, isLoading: statusLoading } = useQuery({
    queryKey: ["applicationStatus", id, user?._id],
    queryFn: () =>
      user?.role === "jobseeker"
        ? applicationStatus(id).then((res) => res.data.applied)
        : false,
    enabled: !!user,
  });

  const applyMutation = useMutation({
    mutationFn: () => applyForJob(id, user._id),
    onSuccess: () => {
      alert("Applied..!");
      queryClient.invalidateQueries(["applicationStatus", id, user?._id]); // Refetch application status
    },
  });

  const applyJob = () => {
    if (!user) {
      alert("Login to apply");
      return;
    }
    if (user?.role === "jobseeker") {
      applyMutation.mutate();
    }
  };
  if (jobLoading || statusLoading)
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading job Details..</p>
      </div>
    );
  
  return (
    <div className="job-details-container">
      <div className="job-header">
        <div>
          <h1 className="job-title">{job.title}</h1>
          <p className="job-company">{job.companyName}</p>
        </div>
        {job.companyWebsite && (
          <a
            href={job.companyWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="company-website"
          >
            Visit Company Website
          </a>
        )}
      </div>

      <div className="job-meta">
        <div className="meta-item">
          <span className="meta-label">Location:</span>
          <span className="meta-value">
            {job.location} {job.remote && "(Remote)"}
          </span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Employment Type:</span>
          <span className="meta-value">{job.employmentType}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Experience Level:</span>
          <span className="meta-value">{job.experienceLevel}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Salary:</span>
          <span className="meta-value">
            ₹{job.minSalary} - ₹{job.maxSalary}
          </span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Application Deadline:</span>
          <span className="meta-value">
            {new Date(job.applicationDeadline).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="job-section">
        <h2 className="section-title">Job Description</h2>
        <p className="job-description">{job.description}</p>
      </div>

      <div className="job-section">
        <h2 className="section-title">Requirements</h2>
        <div className="requirements-grid">
          <div className="requirement-item">
            <h3>Education</h3>
            <p>{job.education}</p>
          </div>
          
            <div className="requirement-item">
              <h3>Years of Experience</h3>
              <p>{job.minExperience} - {job.maxExperience}yrs </p>
            </div>
          
        </div>
      </div>

      {job.skills && job.skills.length > 0 && (
        <div className="job-section">
          <h2 className="section-title">Skills Required</h2>
          <div className="skills-container">
            {job.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* {job.benefits && job.benefits.length > 0 && (
        <div className="job-section">
          <h2 className="section-title">Benefits</h2>
          <ul className="benefits-list">
            {job.benefits.map((benefit, index) => (
              <li key={index} className="benefit-item">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )} */}

      <div className="job-section">
        <h2 className="section-title">Contact Information</h2>
        <p className="contact-email">Email: {job.contactEmail}</p>
      </div>

      {user?.role !== "employer" && (
        <button
          onClick={applyJob}
          className={`apply-button ${applied ? "disabled" : "active"}`}
          disabled={applied || applyMutation.isLoading}
        >
          {applyMutation.isLoading
            ? "Processing..."
            : applied
            ? "Already Applied"
            : "Apply Now"}
        </button>
      )}

      {user?.role === "employer" && user?._id === job?.employerId._id && (
        <div className="employer-actions">
          <button
            onClick={() => setViewApplications(!viewApplications)}
            className="view-applications-btn"
          >
            {viewApplications ? "Hide Applications" : "View Applications"}
          </button>
        </div>
      )}

      {viewApplications && <EmployerApplications jobId={id} />}
    </div>

    // <div className="job-details-container">
    //   <h1 className="job-title">{job.title}</h1>
    //   <p className="job-info"><strong>Description:</strong> {job.description}</p>
    //   <p className="job-info"><strong>Location:</strong> {job.location}</p>
    //   <p className="job-info"><strong>Salary:</strong> {job.salary}</p>
    //   <p className="job-info"><strong>Skills Required:</strong> {job.skills}</p>

    //   {user?.role !== "employer" && (
    //     <button
    //       onClick={applyJob}
    //       className={`apply-button ${applied ? "disabled" : "active"}`}
    //       disabled={applied}
    //     >
    //       {applied ? "Already Applied" : "Apply"}
    //     </button>
    //   )}

    //   {user?.role === "employer" && user?._id === job?.employerId && (
    //     <div>
    //       <button onClick={() => setViewApplications(true)}>View Applications</button>
    //     </div>
    //   )}

    //   {ViewApplications && <EmployerApplications jobId={id} />}
    // </div>
  );
}

export default JobDetails;
