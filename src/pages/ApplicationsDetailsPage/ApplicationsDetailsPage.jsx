import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchJobApplications, updateApplicationStatus } from "../../services/api";
import ApplicantDetails from "../../components/ApplicantDetails/ApplicantDetails";
import "./ApplicationsDetailsPage.css"; 

const ApplicantDetailsPage = () => {
  const { jobId ,applicationId} = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchJobApplications(jobId);
        setApplication(res.data[0]);
        ("Application data:", res.data[0]);
      } catch (error) {
        console.error("Error fetching application:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [jobId]);

  const handleStatusUpdate = async (newStatus) => {
    ("Updating status to:", newStatus);
    try {
      await updateApplicationStatus(applicationId, newStatus);
      setApplication(prev => ({ ...prev, status: newStatus }));
      
      // navigate(-1);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading)
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  if (!application) return <div>Application not found</div>;

  return (
    <div className="applicant-details-page">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to Applications
      </button>
      <ApplicantDetails 
        application={application} 
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default ApplicantDetailsPage;