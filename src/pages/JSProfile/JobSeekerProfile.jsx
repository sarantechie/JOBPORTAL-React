import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import "./JobSeekerProfile.css";
import { uploadResume } from "../../services/api";
import {
  formatDateForDisplay,
  formatDateForInput,
  parseInputDate,
  validateDateFormat,
  formatDateFromAPI,
} from "../../utils/dateUtils";

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
    resume: "",
    profilePicture: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [dateError, setDateError] = useState("");

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) {
      alert("Please select a resume file.");
      return;
    }

    setResumeUploading(true);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const response = await uploadResume(formData);
      ("res...", response);

      if (!response.ok) {
        throw new Error("Failed to upload resume.");
      }

      const data = await response.json();
      setProfile({ ...profile, resume: data.resumePath });
      alert("Resume uploaded successfully!");
    } catch (error) {
      alert(error.message);
    } finally {
      setResumeUploading(false);
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
    currentlyStudying: false,
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
    setDateError("");

    if (newEducation.institution && newEducation.degree) {
      
      if (
        newEducation.startDate &&
        !validateDateFormat(newEducation.startDate)
      ) {
        setDateError("Start date must be in DD/MM/YYYY format");
        return;
      }

      if (
        !newEducation.currentlyStudying &&
        newEducation.endDate &&
        newEducation.endDate !== "Present" &&
        !validateDateFormat(newEducation.endDate)
      ) {
        setDateError("End date must be in DD/MM/YYYY format");
        return;
      }

      let updatedEducation = [...profile.education];
      const educationData = {
        ...newEducation,
        startDate: parseInputDate(newEducation.startDate),
        endDate: newEducation.currentlyStudying
          ? "Present"
          : parseInputDate(newEducation.endDate),
      };

      if (editEducationIndex !== null) {
        updatedEducation[editEducationIndex] = educationData;
        setEditEducationIndex(null);
      } else {
        updatedEducation.push(educationData);
      }

      setProfile({ ...profile, education: updatedEducation });
      setNewEducation({
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        currentlyStudying: false,
      });
    }
  };

  const handleEditEducation = (index) => {
    const educationToEdit = profile.education[index];
    setNewEducation({
      ...educationToEdit,
      startDate: formatDateForInput(educationToEdit.startDate),
      endDate:
        educationToEdit.endDate === "Present"
          ? ""
          : formatDateForInput(educationToEdit.endDate),
      currentlyStudying: educationToEdit.endDate === "Present",
    });
    setEditEducationIndex(index);
  };

  const handleDeleteEducation = (index) => {
    setProfile({
      ...profile,
      education: profile.education.filter((_, i) => i !== index),
    });
  };

  const handleAddExperience = () => {
    setDateError("");

    if (newExperience.company && newExperience.position) {
      
      if (
        newExperience.startDate &&
        !validateDateFormat(newExperience.startDate)
      ) {
        setDateError("Start date must be in DD/MM/YYYY format");
        return;
      }

      if (
        !newExperience.currentlyWorking &&
        newExperience.endDate &&
        newExperience.endDate !== "Present" &&
        !validateDateFormat(newExperience.endDate)
      ) {
        setDateError("End date must be in DD/MM/YYYY format");
        return;
      }

      let updatedExperience = [...profile.experience];
      const experienceData = {
        ...newExperience,
        startDate: parseInputDate(newExperience.startDate),
        endDate: newExperience.currentlyWorking
          ? "Present"
          : parseInputDate(newExperience.endDate),
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
    const experienceToEdit = profile.experience[index];
    setNewExperience({
      ...experienceToEdit,
      startDate: formatDateForInput(experienceToEdit.startDate),
      endDate:
        experienceToEdit.endDate === "Present"
          ? ""
          : formatDateForInput(experienceToEdit.endDate),
      currentlyWorking: experienceToEdit.endDate === "Present",
    });
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
    setSuccessMessage("");

    if (!profile.name || !profile.email) {
      setError("Name, Email are required.");
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile(profile);
      setSuccessMessage("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEducationDateChange = (e, field) => {
    setDateError("");
    setNewEducation({
      ...newEducation,
      [field]: e.target.value,
    });
  };

  const handleExperienceDateChange = (e, field) => {
    setDateError("");
    setNewExperience({
      ...newExperience,
      [field]: e.target.value,
    });
  };

  useEffect(() => {
    if (user) {
      ("User Data:", user);
      const data = user;
    

      setProfile({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        skills: Array.isArray(data.skills) ? data.skills : [],
        education: Array.isArray(data.education)
          ? data.education.map((edu) => ({
              ...edu,
              startDate: formatDateFromAPI(edu.startDate) || "",
              endDate: formatDateFromAPI(edu.endDate) || "",
            }))
          : [],
        experience: Array.isArray(data.experience)
          ? data.experience.map((exp) => ({
              ...exp,
              startDate: formatDateFromAPI(exp.startDate) || "",
              endDate: formatDateFromAPI(exp.endDate) || "",
            }))
          : [],
        resume: data.resume || "",
        profilePicture: data.profilePicture || "",
      });
    }
  }, [user]);

  if (!user || !profile)
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading profile details...</p>
      </div>
    );

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile</h2>
        <div
          className="profile-picture-container"
          onClick={handleProfilePictureClick}
        >
          {profile.profilePicture ? (
            <img
              src={profile.profilePicture || "https://via.placeholder.com/100"}
              alt="Profile Pic"
              className="profile-picture"
            />
          ) : (
            <div className="popup-placeholder">
              {profile.name?.charAt(0).toUpperCase() || "?"}
            </div>
          )}
        </div>
      </div>

      {isPopupOpen && (
        <div className="profile-picture-popup">
          <div className="popup-content">
            <div className="popup-image-container">
              {tempProfilePicture ? (
                <img
                  src={tempProfilePicture || "https://via.placeholder.com/200"}
                  alt="Profile Preview"
                  className="popup-profile-picture"
                  onLoad={(e) => {
                    
                    e.target.style.objectFit = "cover";
                    e.target.style.objectPosition = "center";
                  }}
                />
              ) : (
                <div className="popup-placeholder">
                  {profile.name?.charAt(0).toUpperCase() || "?"}
                </div>
              )}
            </div>
            <div className="file-input-wrapper">
              <label htmlFor="profile-picture-upload" className="edit-icon">
                Select Profile picture
              </label>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>
            <div className="popup-buttons">
              <button onClick={handleSaveProfilePicture}>Save</button>
              <button onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {dateError && <p className="error-message">{dateError}</p>}

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
        <div className="skills-input-container">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
          />
          <button type="button" className="action-btn" onClick={handleAddSkill}>
            Add
          </button>
        </div>
        <div className="skills-list">
          {profile.skills.map((skill, index) => (
            <div key={index} className="skill-item">
              {skill}
              <button
                onClick={() => handleRemoveSkill(index)}
                className="remove-skill-btn"
              >
                x
              </button>
            </div>
          ))}
        </div>

        <label>Education</label>
        <div className="education-form">
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
          <div className="date-fields">
            <input
              type="text"
              placeholder="Start Date (dd/mm/yyyy)"
              value={newEducation.startDate}
              onChange={(e) => handleEducationDateChange(e, "startDate")}
            />
            <input
              type="text"
              placeholder={
                newEducation.currentlyStudying
                  ? "Present"
                  : "End Date (dd/mm/yyyy)"
              }
              value={newEducation.endDate}
              disabled={newEducation.currentlyStudying}
              onChange={(e) => handleEducationDateChange(e, "endDate")}
            />
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={newEducation.currentlyStudying}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    currentlyStudying: e.target.checked,
                    endDate: e.target.checked ? "Present" : "",
                  })
                }
              />
              Currently Studying
            </label>
          </div>
          <button
            type="button"
            className="action-btn"
            onClick={handleAddEducation}
          >
            {editEducationIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Institution</th>
              <th>Degree</th>
              <th>Field</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {profile.education.map((edu, index) => (
              <tr key={index}>
                <td>{edu.institution}</td>
                <td>{edu.degree}</td>
                <td>{edu.fieldOfStudy}</td>
                <td>{formatDateForDisplay(edu.startDate)}</td>
                <td>{formatDateForDisplay(edu.endDate)}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleEditEducation(index)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteEducation(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <label>Experience</label>
        <div className="experience-form">
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
          <div className="date-fields">
            <input
              type="text"
              placeholder="Start Date (dd/mm/yyyy)"
              value={newExperience.startDate}
              onChange={(e) => handleExperienceDateChange(e, "startDate")}
            />
            <input
              type={newExperience.currentlyWorking ? "text" : "text"}
              placeholder={
                newExperience.currentlyWorking
                  ? "Present"
                  : "End Date (dd/mm/yyyy)"
              }
              value={newExperience.endDate}
              disabled={newExperience.currentlyWorking}
              onChange={(e) => handleExperienceDateChange(e, "endDate")}
            />
            <label className="checkbox-label">
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
              />
              Currently Working
            </label>
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
          <button
            type="button"
            className="action-btn"
            onClick={handleAddExperience}
          >
            {editExperienceIndex !== null ? "Update" : "Add"}
          </button>
        </div>

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
                <td>{formatDateForDisplay(exp.startDate)}</td>
                <td>{formatDateForDisplay(exp.endDate)}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleEditExperience(index)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteExperience(index)}
                  >
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
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
            </p>
          )} */}

        <button type="submit" className="profile-btn" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default JobSeekerProfile;
