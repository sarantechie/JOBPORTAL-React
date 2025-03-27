import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import "../styles/Profile.css";
import { deleteResume, getResumeUrl, uploadResume } from "../services/api";

const JobSeekerProfile = () => {
  const { user, updateProfile } = useContext(AppContext);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    skills: [],
    education: [],
    experience: [],
    resume: null,
    resumeUrl: "",
    profilePicture: "",
  });

  const [resumeError, setResumeError] = useState("");

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        setResumeError("Please upload a PDF, DOC, or DOCX file");
        return;
      }

      // 5MB max file size
      if (file.size > 5 * 1024 * 1024) {
        setResumeError("File size should be less than 5MB");
        return;
      }

      setProfile((prev) => ({
        ...prev,
        resume: file,
        resumeError: "",
      }));
    }
  };

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setResumeError("Please select a resume file.");
      return;
    }

    setResumeUploading(true);
    setResumeError("");
    setResumeSuccess("");

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const response = await uploadResume(formData);
      const data = response.data;

      setProfile((prev) => ({
        ...prev,
        resume: data.resumeUrl || data.resumePath,
      }));
      setResumeSuccess("Resume uploaded successfully!");
      setResumeFile(null);
    } catch (error) {
      setResumeError(error.message || "Failed to upload resume");
    } finally {
      setResumeUploading(false);
    }
  };

  const handleDeleteResume = async (e) => {
    e.preventDefault();
    if (!profile.resume) return;
    if (window.confirm("Are you sure you want to delete your resume?")) {
      try {
        const response = await deleteResume();

        setProfile((prev) => ({ ...prev, resume: "" }));
        setResumeSuccess("Resume deleted successfully!");
      } catch (error) {
        setResumeError(error.message);
      }
    }
  };

  const [newSkill, setNewSkill] = useState("");
  const [newExperience, setNewExperience] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
    currentlyWorking: false,
  });

  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
  });

  const [editEducationIndex, setEditEducationIndex] = useState(null);
  const [editExperienceIndex, setEditExperienceIndex] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tempProfilePicture, setTempProfilePicture] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleProfilePictureClick = () => {
    setTempProfilePicture(profile.profilePicture);
    setIsPopupOpen(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfilePicture = () => {
    setProfile({ ...profile, profilePicture: tempProfilePicture });
    setIsPopupOpen(false);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleAddSkill = () => {
    if (newSkill) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill] });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((_, i) => i !== index),
    });
  };

  const handleAddEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      let updatedEducation = [...profile.education];
      if (editEducationIndex !== null) {
        updatedEducation[editEducationIndex] = newEducation;
        setEditEducationIndex(null);
      } else {
        updatedEducation.push(newEducation);
      }
      setProfile({ ...profile, education: updatedEducation });
      setNewEducation({
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
      });
    }
  };

  const handleEditEducation = (index) => {
    setNewEducation({ ...profile.education[index] });
    setEditEducationIndex(index);
  };

  const handleDeleteEducation = (index) => {
    setProfile({
      ...profile,
      education: profile.education.filter((_, i) => i !== index),
    });
  };

  const handleAddExperience = () => {
    if (newExperience.company && newExperience.position) {
      let updatedExperience = [...profile.experience];
      const experienceData = {
        ...newExperience,
        endDate: newExperience.currentlyWorking
          ? "Present"
          : newExperience.endDate,
      };

      if (editExperienceIndex !== null) {
        updatedExperience[editExperienceIndex] = experienceData;
        setEditExperienceIndex(null);
      } else {
        updatedExperience.push(experienceData);
      }

      setProfile({ ...profile, experience: updatedExperience });
      setNewExperience({
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        currentlyWorking: false,
      });
    }
  };

  const handleEditExperience = (index) => {
    setNewExperience({ ...profile.experience[index] });
    setEditExperienceIndex(index);
  };

  const handleDeleteExperience = (index) => {
    setProfile({
      ...profile,
      experience: profile.experience.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResumeError("");
    setSuccessMessage("");

    if (!profile.name || !profile.email || !profile.phone) {
      setError("Name, Email, and Phone are required.");
      return;
    }
    console.log("------->>>>", profile.resume);

    setIsLoading(true);
    try {
      if (profile.resume instanceof File) {
        const resumeFormData = new FormData();
        resumeFormData.append("resume", profile.resume);
        
        const resumeResponse = await uploadResume(resumeFormData);
        if (!resumeResponse.success) {
          throw new Error("Failed to upload resume");
        }
      }
      const res =await updateProfile(profile);
      setProfile(res.data.user);
      setSuccessMessage("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("user...", user);
    console.log("user resume", user.resume?.originalName);

    if (user) {
      const data = user;
      const resumeUrl = data.resume?.fileId
        ? getResumeUrl(data.resume.fileId)
        : "";
      setProfile({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        skills: Array.isArray(data.skills) ? data.skills : [],
        education: Array.isArray(data.education) ? data.education : [],
        experience: Array.isArray(data.experience) ? data.experience : [],
        resume: null,
        resumeUrl: resumeUrl,
        resumeData: data.resume || null,
        profilePicture: data.profilePicture || "",
      });
    }
  }, [user]);

  if (!user || !profile) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile</h2>
        <div
          className="profile-picture-container"
          onClick={handleProfilePictureClick}
        >
          <img
            src={profile.profilePicture || "https://via.placeholder.com/100"}
            alt="Profile"
            className="profile-picture"
          />
        </div>
      </div>

      {isPopupOpen && (
        <div className="profile-picture-popup">
          <div className="popup-content">
            <img
              src={tempProfilePicture || "https://via.placeholder.com/200"}
              alt="Profile Preview"
              className="popup-profile-picture"
            />
            <label htmlFor="profile-picture-upload" className="edit-icon">
              Edit
            </label>
            <input
              id="profile-picture-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
            <div className="popup-buttons">
              <button onClick={handleSaveProfilePicture}>Save</button>
              <button onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form className="profile-form" onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />

        <label>Address</label>
        <textarea
          name="address"
          value={profile.address}
          onChange={handleChange}
          placeholder="Enter your address"
        ></textarea>

        <label>Skills</label>
        <div className="multi-field">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
          />
          <button type="button" className="add-btn" onClick={handleAddSkill}>
            +
          </button>
        </div>
        <div className="skills-container">
          {profile.skills.map((skill, index) => (
            <span key={index} className="skill-badge">
              {skill}{" "}
              <button
                onClick={() => handleRemoveSkill(index)}
                className="remove-btn"
              >
                -
              </button>
            </span>
          ))}
        </div>

        <label>Education</label>
        <div className="multi-field">
          <input
            type="text"
            placeholder="Institution"
            value={newEducation.institution}
            onChange={(e) =>
              setNewEducation({
                ...newEducation,
                institution: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Degree"
            value={newEducation.degree}
            onChange={(e) =>
              setNewEducation({ ...newEducation, degree: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Field of Study"
            value={newEducation.fieldOfStudy}
            onChange={(e) =>
              setNewEducation({
                ...newEducation,
                fieldOfStudy: e.target.value,
              })
            }
          />
          <input
            type="date"
            placeholder="Start Date"
            value={newEducation.startDate}
            onChange={(e) =>
              setNewEducation({ ...newEducation, startDate: e.target.value })
            }
          />
          <input
            type="date"
            placeholder="End Date"
            value={newEducation.endDate}
            onChange={(e) =>
              setNewEducation({ ...newEducation, endDate: e.target.value })
            }
          />
          <button
            type="button"
            className="add-btn"
            onClick={handleAddEducation}
          >
            {editEducationIndex !== null ? "Update" : "+"}
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Institution</th>
              <th>Degree</th>
              <th>Field</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {profile.education.map((edu, index) => (
              <tr key={index}>
                <td>{edu.institution}</td>
                <td>{edu.degree}</td>
                <td>{edu.fieldOfStudy}</td>
                <td>
                  <button onClick={() => handleEditEducation(index)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteEducation(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <label>Experience</label>
        <input
          type="text"
          placeholder="Company"
          value={newExperience.company}
          onChange={(e) =>
            setNewExperience({ ...newExperience, company: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Position"
          value={newExperience.position}
          onChange={(e) =>
            setNewExperience({ ...newExperience, position: e.target.value })
          }
        />
        <div className="multi-field">
          <input
            type="date"
            placeholder="Start Date"
            value={newExperience.startDate}
            onChange={(e) =>
              setNewExperience({
                ...newExperience,
                startDate: e.target.value,
              })
            }
          />
          <input
            type={newExperience.currentlyWorking ? "text" : "date"}
            placeholder="End Date"
            value={
              newExperience.currentlyWorking ? "Present" : newExperience.endDate
            }
            disabled={newExperience.currentlyWorking}
            onChange={(e) =>
              setNewExperience({ ...newExperience, endDate: e.target.value })
            }
          />
          <input
            type="checkbox"
            checked={newExperience.currentlyWorking}
            onChange={(e) =>
              setNewExperience({
                ...newExperience,
                currentlyWorking: e.target.checked,
                endDate: e.target.checked ? "Present" : "",
              })
            }
          />{" "}
          Currently Working
        </div>
        <textarea
          placeholder="Description"
          value={newExperience.description}
          onChange={(e) =>
            setNewExperience({
              ...newExperience,
              description: e.target.value,
            })
          }
        ></textarea>
        <button type="button" onClick={handleAddExperience}>
          {editExperienceIndex !== null ? "Update" : "Add Experience"}
        </button>

        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {profile.experience.map((exp, index) => (
              <tr key={index}>
                <td>{exp.company}</td>
                <td>{exp.position}</td>
                <td>{exp.startDate}</td>
                <td>{exp.endDate}</td>
                <td>
                  <button onClick={() => handleEditExperience(index)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteExperience(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <label>Resume</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeChange}
        />
        <button onClick={handleResumeUpload} disabled={resumeUploading}>
          {resumeUploading ? "Uploading..." : "Upload Resume"}
        </button>
        {profile.resume && (
          <p className="resume-file-name">
            Uploaded Resume:{" "}
            <a href={profile.resume} target="_blank" rel="noopener noreferrer">
              View Resume
            </a>
          </p>
        )} */}

        <div className="resume-section">
          <h3>Resume....</h3>
          {profile.resumeUrl ? (
            <div className="resume-actions">
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-link"
              >
                View Current Resume
                {profile.resumeData?.originalName && (
                  <span> ({profile.resumeData.originalName})</span>
                )}
              </a>
              <button
                onClick={handleDeleteResume}
                className="delete-resume-btn"
              >
                Delete Resume
              </button>
            </div>
          ) : profile.resume instanceof File ? (
            <p className="resume-info">
              New resume selected: {profile.resume.name}
            </p>
          ) : (
            <p className="no-resume">No resume uploaded yet</p>
          )}

          <div className="upload-resume-form">
            <input
              type="file"
              id="resume-upload"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              style={{ display: "none" }}
            />
            <label htmlFor="resume-upload" className="upload-btn">
              {profile.resume instanceof File
                ? "Change Resume"
                : "Select Resume"}
            </label>
            {profile.resume instanceof File && (
              <button
                type="button"
                onClick={() =>
                  setProfile((prev) => ({ ...prev, resume: null }))
                }
                className="cancel-resume-btn"
              >
                Cancel
              </button>
            )}

            {resumeError && <p className="error-message">{resumeError}</p>}

          </div>
          <p className="file-requirements">
            Accepted formats: PDF, DOC, DOCX (Max 5MB)
          </p>
        </div>

        <button type="submit" className="profile-btn" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default JobSeekerProfile;
