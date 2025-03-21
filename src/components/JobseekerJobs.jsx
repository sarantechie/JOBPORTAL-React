import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyJobs } from "../services/api";

const JobseekerJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

  const handleWithdraw = async (applicationId) => {
    try {
      await axios.put(`/api/applications/withdraw/${applicationId}`, {});

    
      setAppliedJobs(
        appliedJobs.map((job) =>
          job._id === applicationId ? { ...job, status: "Withdrawn" } : job
        )
      );
    } catch (error) {
      console.error("Error withdrawing application:", error);
    }
  };

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await getMyJobs();
        setAppliedJobs(res.data);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };

    fetchAppliedJobs();
  }, []);
  return (
    <>
      <h1>Applied Jobs</h1>
      <div className="container">
        {appliedJobs.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <div className="job-list">
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
          </div>
        )}
      </div>
    </>
  );
};

export default JobseekerJobs;
