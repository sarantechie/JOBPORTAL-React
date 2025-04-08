import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyJobs, withdrawApplication } from "../../../services/api";
import "./JobseekerJobs.css";

const JobseekerJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleWithdraw = async (applicationId) => {
    try {
      setLoading(true);
      await withdrawApplication(applicationId);
      setAppliedJobs((prev) =>
        prev.map((job) =>
          job._id === applicationId ? { ...job, status: "Withdrawn" } : job
        )
      );
      setLoading(false);
    } catch (error) {
      console.error("Error withdrawing application:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      setLoading(true);
      try {
        const res = await getMyJobs();
        setAppliedJobs(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching applied jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (loading)
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading your applications...</p>
      </div>
    );

  return (
    <div className="jobseeker-jobs-container">
      <div className="header-section">
        <h2>Your Job Applications</h2>
        <p className="subtitle">Track and manage your applications</p>
      </div>

      {appliedJobs.length === 0 ? (
        <div className="empty-state">
          <p>You haven't applied to any jobs yet.</p>
          <button className="primary-btn" onClick={() => navigate("/jobs")}>
            Browse Jobs
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="applications-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appliedJobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.jobId.title}</td>
                  <td>{job.jobId.companyName}</td>
                  <td>{job.jobId.location}</td>
                  <td>
                    {new Date(job.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${job.status.toLowerCase()}`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="view-btn"
                        onClick={() => navigate(`/job/${job.jobId._id}`)}
                      >
                        View
                      </button>
                      {/* {job.status.toLowerCase() === "pending" && (
                        <button
                          className="withdraw-btn"
                          onClick={() => handleWithdraw(job._id)}
                        >
                          Withdraw
                        </button>
                      )} */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobseekerJobs;

{
  /* <div className="job-list">
              {appliedJobs.map((job) => (
                <div key={job._id} className="job-card">
                  <h3>{job.jobId.title}</h3>
                  <p>
                    {job.jobId.company} - {job.jobId.location}
                  </p>
                  <p>
                    <strong>Applied on:</strong>{" "}
                    {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Status:</strong> {job.status}
                  </p>

                  {job.status === "Pending" ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleWithdraw(job._id)}
                    >
                      Withdraw Application
                    </button>
                  ) : (
                    <p>
                      <strong>Updated on:</strong>{" "}
                      {new Date(job.updatedAt).toLocaleDateString()}
                    </p>
                  )}

                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/job/${job.jobId._id}`)}
                  >
                    View Job Details
                  </button>
                </div>
              ))}
            </div> */
}
