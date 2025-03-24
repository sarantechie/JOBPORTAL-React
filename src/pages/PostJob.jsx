import { useState } from "react";
import { createJob } from "../services/api";
import "../styles/PostJob.css";
function PostJob() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    salary: "",
    description: "",
    skills: [""],
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
    setLoading(true);
    e.preventDefault();
    await createJob(form);
    setLoading(false);
    alert("Job posted successfully!");
    setForm({
      title: "",
      location: "",
      salary: "",
      description: "",
      skills: [""],
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
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          onChange={handleChange}
          required
        />

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
        <button type="submit">{loading ? "Posting..." : "Post Job"}</button>
      </form>
    </div>
  );
}

export default PostJob;
