import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import "../styles/Profile.css";
import { uploadResume } from "../services/api";

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
      console.log("res...", response);

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
    setSuccessMessage("");

    if (!profile.name || !profile.email || !profile.phone) {
      setError("Name, Email, and Phone are required.");
      return;
    }
    console.log("------->>>>", profile.resume);

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

  useEffect(() => {
    if (user) {
      const data = user;
      setProfile({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        skills: Array.isArray(data.skills) ? data.skills : [],
        education: Array.isArray(data.education) ? data.education : [],
        experience: Array.isArray(data.experience) ? data.experience : [],
        resume: data.resume || "",
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
                newExperience.currentlyWorking
                  ? "Present"
                  : newExperience.endDate
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
