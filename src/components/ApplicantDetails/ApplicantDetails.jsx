import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApplicantDetails } from "../../services/api";
import "./ApplicantDetails.css";

const ApplicantDetails = ({ application, onStatusUpdate }) => {
  const { jobSeekerId, status } = application;
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applicationStatus, setApplicationStatus] = useState(status);

  useEffect(() => {
    const getApplicantDetails = async () => {
      try {
        const res = await fetchApplicantDetails(jobSeekerId._id);
        console.log("Applicant details:", res.data);
        setApplicant(res.data);
      } catch (error) {
        console.error("Error fetching applicant details:", error);
      } finally {
        setLoading(false);
      }
    };

    getApplicantDetails();
  }, [jobSeekerId]);

  if (loading)
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading applicant details...</p>
      </div>
    );
    if (!applicant) return <p>Applicant not found.</p>;

  return (
    <div className="applicant-details">
      <div className="applicant-header">
        <div className="profile-section">
          {applicant.profilePicture && (
            <img
              src={applicant.profilePicture}
              alt="Profile"
              className="profile-image"
            />
          )}
          <div>
            <h2>{applicant.name}</h2>
            <div className={`status-badge ${applicationStatus}`}>
              {applicationStatus}
            </div>
          </div>
        </div>
        {status === "pending" ? (
          <div className="status-actions">
            <button
              onClick={() => onStatusUpdate("accepted")}
              disabled={status === "accepted" || status === "rejected"}
              className={`status-btn ${status === "accepted" ? "active" : ""}`}
            >
              {status === "accepted"  ? "Accepted" : "Accept Applicant"}
            </button>
            <button
              onClick={() => onStatusUpdate("rejected")}
              disabled={status === "rejected" || status === "accepted"}
              className={`status-btn ${status === "rejected" ? "active" : ""}`}
            >
              {status === "rejected" ? "Rejected" : "Reject Applicant"}
            </button>
          </div>
         ) : (
          <p>Decision made</p>
        )} 
      </div>

      <div className="info-section">
        <h3>Contact Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{applicant.email}</span>
          </div>
          {applicant.phone && (
            <div className="info-item">
              <span className="info-label">Phone:</span>
              <span className="info-value">{applicant.phone}</span>
            </div>
          )}
          {applicant.address && (
            <div className="info-item">
              <span className="info-label">Address:</span>
              <span className="info-value">{applicant.address}</span>
            </div>
          )}
        </div>
      </div>
      {/* Skills */}
      {applicant.skills?.length > 0 && (
        <div className="info-section">
          <h3>Skills</h3>
          <div className="skills-container">
            {applicant.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="info-section">
        <h3>Education</h3>
        {applicant.education?.length > 0 ? (
          <div className="education-container">
            {applicant.education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="education-header">
                  <h4>{edu.institution}</h4>
                  <span className="education-duration">
                    {new Date(edu.startDate).toLocaleDateString()} -{" "}
                    {edu.currentlyStudying
                      ? "Present"
                      : new Date(edu.endDate).toLocaleDateString()}
                  </span>
                </div>
                <p className="education-degree">
                  {edu.degree} in {edu.fieldOfStudy}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No education information provided</p>
        )}
      </div>

      {/* Experience */}
      <div className="info-section">
        <h3>Work Experience</h3>
        {applicant.experience?.length > 0 ? (
          <div className="experience-container">
            {applicant.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="experience-header">
                  <h4>{exp.company}</h4>
                  <span className="experience-duration">
                    {new Date(exp.startDate).toLocaleDateString()} -{" "}
                    {exp.currentlyWorking
                      ? "Present"
                      : new Date(exp.endDate).toLocaleDateString()}
                  </span>
                </div>
                <p className="experience-position">{exp.position}</p>
                {exp.description && (
                  <p className="experience-description">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No work experience provided</p>
        )}
      </div>

      {/* Resume */}
      {/* {applicant.resume && (
        <div className="info-section">
          <h3>Resume</h3>
          <a
            href={applicant.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-link"
          >
            Download Resume
          </a>
        </div>
      )} */}
    </div>
  );
};

export default ApplicantDetails;
