import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";
import { registerUser } from "../services/api";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(form);
     alert('Registration successful!');
    navigate("/login");
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder={form.role==="jobseeker"?"Full Name":"Company Name"}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <select name="role" onChange={handleChange}>
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
