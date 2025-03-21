import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApplicantDetails } from "../services/api";

const ApplicantDetails = () => {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getApplicantDetails = async () => {
      console.log("id",id);
      
      try {
        const res = await fetchApplicantDetails(id);
        setApplicant(res.data);
      } catch (error) {
        console.error("Error fetching applicant details:", error);
      } finally {
        setLoading(false);
      }
    };

    getApplicantDetails();
  }, [id]);

  if (loading) return <p>Loading applicant details...</p>;
  if (!applicant) return <p>Applicant not found.</p>;

  return (
    <div className="applicant-details">
      <h2>{applicant.name}'s Profile</h2>
      {applicant.profilePicture && (
        <img
          src={applicant.profilePicture}
          alt="Profile"
          style={{ width: "100px",height:"100px", borderRadius: "50%", marginTop: "10px" }}
        />
      )}
      <p><strong>Email:</strong> {applicant.email}</p>
      <p><strong>Phone:</strong> {applicant.phone}</p>
      <p><strong>Address:</strong> {applicant.address || "N/A"}</p>
      <p><strong>Skills:</strong> {applicant.skills?.join(", ") || "N/A"}</p>


      <h3>Education</h3>
      {applicant.education.length > 0 ? (
        <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Institution</th>
            <th>Degree</th>
            <th>Field of Study</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
            {applicant.education.map((edu, index) => (
              <tr key={index}>
              <td>{edu.institution}</td>
              <td>{edu.degree}</td>
              <td>{edu.fieldOfStudy}</td>
              <td>
                {new Date(edu.startDate).getFullYear()} -{" "}
                {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"}
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No education details available.</p>
      )}

     
      <h3>Experience</h3>
      {applicant.experience.length > 0 ? (
         <table border="1" cellPadding="8" style={{ width: "100%" }}>
         <thead>
           <tr>
             <th>Company</th>
             <th>Position</th>
             <th>Duration</th>
             <th>Description</th>
           </tr>
         </thead>
         <tbody>
            {applicant.experience.map((exp, index) => (
              <tr key={index}>
              <td>{exp.company}</td>
              <td>{exp.position}</td>
              <td>
                {new Date(exp.startDate).getFullYear()} -{" "}
                {exp.currentlyWorking ? "Present" : exp.endDate}
              </td>
              <td>{exp.description || "N/A"}</td>
            </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No experience details available.</p>
      )}

    
      {/* {applicant.resume && (
        <p>
          <strong>Resume:</strong>{" "}
          <a href={applicant.resume} target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
        </p>
      )} */}
    </div>
  );
};

export default ApplicantDetails;
