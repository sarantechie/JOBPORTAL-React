import { useState } from "react";
import { createJob } from "../../services/api";
import "./PostJob.css";

function PostJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    remote: false,
    employmentType: "",
    experienceLevel: "",
    minSalary: "",
    maxSalary: "",
    minExperience: "",
    maxExperience: "",
    education: "",
    benefits: [],
    description: "",
    skills: [""],
    applicationDeadline: "",
    contactEmail: "",
    companyWebsite: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...form.skills];
    updatedSkills[index] = value;
    setForm({ ...form, skills: updatedSkills });
  };

  const addSkill = () => setForm({ ...form, skills: [...form.skills, ""] });

  const removeSkill = (index) => {
    const updatedSkills = form.skills.filter((_, i) => i !== index);
    setForm({ ...form, skills: updatedSkills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createJob(form);
    setLoading(false);
    alert("Job posted successfully!");
    setForm({
      title: "",
      companyName: "",
      location: "",
      remote: false,
      salary: "",
      employmentType: "",
      experienceLevel: "",
      yearsOfExperience: "",
      education: "",
      benefits: [],
      description: "",
      skills: [""],
      applicationDeadline: "",
      contactEmail: "",
      companyWebsite: "",
    });
  };

  return (
    <div className="postjob-container">
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
        />
        <label>
          <input type="checkbox" name="remote" onChange={handleChange} />
          Remote Job
        </label>
        <select name="employmentType" onChange={handleChange} required>
          <option value="">Select Employment Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
        <select name="experienceLevel" onChange={handleChange} required>
          <option value="">Select Experience Level</option>
          <option value="Entry">Entry Level</option>
          <option value="Mid">Mid Level</option>
          <option value="Senior">Senior Level</option>
        </select>
        <select name="education" onChange={handleChange} required>
          <option value="">Select Educational Qualification</option>
          <option value="High School">High School</option>
          <option value="Diploma">Diploma</option>
          <option value="Bachelor’s Degree">Bachelor’s Degree</option>
          <option value="Master’s Degree">Master’s Degree</option>
        </select>
        <div className="range-group">
          <label>Salary Range</label>
          <div className="range-inputs">
            <input
              type="number"
              name="minSalary"
              placeholder="Minimum"
              onChange={handleChange}
              required
            />
            <span>to</span>
            <input
              type="number"
              name="maxSalary"
              placeholder="Maximum"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="range-group">
          <label>Experience Required (years)</label>
          <div className="range-inputs">
            <input
              type="number"
              name="minExperience"
              placeholder="Minimum"
              onChange={handleChange}
              required
            />
            <span>to</span>
            <input
              type="number"
              name="maxExperience"
              placeholder="Maximum"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* <label>Job Benefits:</label>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="benefits"
              value="Health Insurance"
              onChange={handleChange}
            />{" "}
            Health Insurance
          </label>
          <label>
            <input
              type="checkbox"
              name="benefits"
              value="Work from Home"
              onChange={handleChange}
            />
            Hybrid
          </label>
          <label>
            <input
              type="checkbox"
              name="benefits"
              value="Flexible Hours"
              onChange={handleChange}
            />{" "}
            Flexible Hours
          </label>
        </div> */}
        {}
        <div className="skills-container">
          {form.skills.map((skill, index) => (
            <div key={index} className="skill-input">
              <input
                type="text"
                placeholder="Skill"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  className="remove-skill"
                  onClick={() => removeSkill(index)}
                >
                  -
                </button>
              )}
            </div>
          ))}
          <button type="button" className="add-skill" onClick={addSkill}>
            + Add Skill
          </button>
        </div>
   
        <textarea
          name="description"
          placeholder="Job Description"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="contactEmail"
          placeholder="Contact Email"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="applicationDeadline"
          placeholder="Select Deadline"
          onChange={handleChange}
          required
          className="date-input"
        />{" "}
        <input
          type="url"
          name="companyWebsite"
          placeholder="Company Website (Optional)"
          onChange={handleChange}
        />
        <button type="submit">{loading ? "Posting..." : "Post Job"}</button>
      </form>
    </div>
  );
}

export default PostJob;
