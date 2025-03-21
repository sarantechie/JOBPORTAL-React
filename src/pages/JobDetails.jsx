import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationStatus, applyForJob, fetchJob } from "../services/api";
import AppContext from "../context/AppContext";
import "../styles/jobDetails.css";
import EmployerApplications from "../components/EmployerApplications";

function JobDetails() {
  const { id } = useParams();
  const { user } = useContext(AppContext);
  const queryClient = useQueryClient();
  const [ViewApplications, setViewApplications] = useState(false);

  // Fetch job details
  const { data: job, isLoading: jobLoading } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJob(id).then((res) => res.data),
  });

  // Check application status
  const { data: applied, isLoading: statusLoading } = useQuery({
    queryKey: ["applicationStatus", id, user?._id],
    queryFn: () => (user?.role === "jobseeker" ? applicationStatus(id).then((res) => res.data.applied) : false),
    enabled: !!user,
  });

  // Mutation for applying to a job
  const applyMutation = useMutation({
    mutationFn: () => applyForJob(id, user._id),
    onSuccess: () => {
      alert("Applied..!");
      queryClient.invalidateQueries(["applicationStatus", id, user?._id]); // Refetch application status
    },
  });

  // Apply job handler
  const applyJob = () => {
    if (!user) {
      alert("Login to apply");
      return;
    }
    if (user?.role === "jobseeker") {
      applyMutation.mutate();
    }
  };

  if (jobLoading || statusLoading) return <p>Loading...</p>;

  return (
    <div className="job-details-container">
      <h1 className="job-title">{job.title}</h1>
      <p className="job-info"><strong>Description:</strong> {job.description}</p>
      <p className="job-info"><strong>Location:</strong> {job.location}</p>
      <p className="job-info"><strong>Salary:</strong> {job.salary}</p>
      <p className="job-info"><strong>Skills Required:</strong> {job.skills}</p>

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
          <button onClick={() => setViewApplications(true)}>View Applications</button>
        </div>
      )}

      {ViewApplications && <EmployerApplications jobId={id} />}
    </div>
  );
}

export default JobDetails;
