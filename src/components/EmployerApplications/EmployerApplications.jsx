import React, { useEffect, useState } from "react";
import {
  fetchJobApplications,
  updateApplicationStatus,
} from "../../services/api";
import ApplicantDetailsPopup from "../ApplicantDetails/ApplicantDetails";
import { Link, useNavigate } from "react-router-dom";
import "./EmployerApplications.css";

const EmployerApplications = ({ jobId }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getApplications = async () => {
      try {
        const res = await fetchJobApplications(jobId);
        setApplications(res.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    getApplications();
  }, [jobId]);

  const handleViewApplicant = (applicationId) => {
    navigate(`/applications/${jobId}/${applicationId}`);
  };

  const handleUpdateStatus = async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status } : app
        )
      );
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  if (loading)
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading applications...</p>
      </div>
    );
  return (
    <div className="applications-container">
      <h2 className="applications-header">Job Applications</h2>
      {applications.length === 0 ? (
        <p className="no-applications">No applications received yet.</p>
      ) : (
        <table className="applications-table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>
                  {/* <Link
                    to={`/applicant/${app.jobSeekerId._id}`}
                    className="applicant-link"
                  >
                    {app.jobSeekerId.name}
                  </Link> */}
                  <button
                    onClick={() => handleViewApplicant(app._id)}
                    className="name-applicant-link"
                  >
                    {app.jobSeekerId.name}
                  </button>
                </td>
                <td>{app.jobSeekerId.email}</td>
                <td>
                  <span className={`status-badge status-${app.status}`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    {app.status === "pending" ? (
                      <>
                        <button
                          onClick={() =>
                            handleUpdateStatus(app._id, "accepted")
                          }
                          className="action-btn accept-btn"
                          title="Accept application"
                        >
                          ✔
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStatus(app._id, "rejected")
                          }
                          className="action-btn reject-btn"
                          title="Reject application"
                        >
                          ✖
                        </button>
                      </>
                    ) : (
                      <span className="action-completed">Decision made</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployerApplications;
