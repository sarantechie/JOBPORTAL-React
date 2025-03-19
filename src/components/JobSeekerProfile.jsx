import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import "../styles/Profile.css";
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
    setNewEducation(profile.education[index]);
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
    setNewExperience(profile.experience[index]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(profile);
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
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile</h2>
        <img
          src={profile.profilePicture || "https://via.placeholder.com/100"}
          alt="Profile"
          className="profile-picture"
        />
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
        />

        <label>Address</label>
        <textarea
          name="address"
          value={profile.address}
          onChange={handleChange}
        ></textarea>

        <label>Skills</label>
        <div className="multi-field">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
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
              setNewEducation({ ...newEducation, institution: e.target.value })
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
              setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })
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
        <input type="text" placeholder="Company" value={newExperience.company} onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })} />
        <input type="text" placeholder="Position" value={newExperience.position} onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })} />
        <input type="date" placeholder="Start Date" value={newExperience.startDate} onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })} />
        <input type="checkbox" checked={newExperience.currentlyWorking} onChange={(e) => setNewExperience({ ...newExperience, currentlyWorking: e.target.checked, endDate: e.target.checked ? "Present" : "" })} /> Currently Working
        <input type="date" placeholder="End Date" value={newExperience.currentlyWorking ? "Present" : newExperience.endDate} disabled={newExperience.currentlyWorking} onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })} />
        <textarea placeholder="Description" value={newExperience.description} onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}></textarea>
        <button type="button" onClick={handleAddExperience}>{editExperienceIndex !== null ? "Update" : "Add Experience"}</button>

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

        <label>Resume</label>
        <input
          type="file"
          onChange={(e) =>
            setProfile({ ...profile, resume: e.target.files[0] })
          }
        />

        <button type="submit" className="profile-btn">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default JobSeekerProfile;
