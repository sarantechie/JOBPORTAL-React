import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";

const EmployerProfile = () => {
  const { user, updateProfile } = useContext(AppContext);
  const [formData, setFormData] = useState(user || {});
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    companyWebsite: "",
    industry: "",
    address: "",
    profilePicture: "",
  });
  useEffect(() => {
    setProfile(user);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(profile);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <div className="container">
        <h2>Employer Profile</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <input type="email" name="email" value={profile.email} readOnly />
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <input
            type="text"
            name="companyName"
            value={profile.companyName}
            onChange={handleChange}
            placeholder="Company Name"
          />
          <input
            type="text"
            name="companyWebsite"
            value={profile.companyWebsite}
            onChange={handleChange}
            placeholder="Company Website"
          />
          <input
            type="text"
            name="industry"
            value={profile.industry}
            onChange={handleChange}
            placeholder="Industry"
          />
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Address"
          />
          <input
            type="text"
            name="profilePicture"
            value={profile.profilePicture}
            onChange={handleChange}
            placeholder="Profile Picture URL"
          />

          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default EmployerProfile;
