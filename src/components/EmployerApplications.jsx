import React, { useEffect, useState } from "react";
import { fetchJobApplications, updateApplicationStatus } from "../services/api";

const EmployerApplications = ({ jobId }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading applications...</p>;

  return (
    <div>
      <h2>Job Applications</h2>
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Job Seeker</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.jobSeekerId.name}</td>
                <td>{app.jobSeekerId.email}</td>
                <td>
                  {app.status !== "pending"
                    ? app.status === "accepted"
                      ? "Accepted"
                      : app.status === "rejected"
                      ? "Rejected"
                      : "Pending"
                    : "Pending"}
                </td>
                <td>
            {app.status !== "pending" ? "----" : (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(app._id, "accepted")}
                      >
                        ✅
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(app._id, "rejected")}
                      >
                        ❌
                      </button>
                    </>
                  )}
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
