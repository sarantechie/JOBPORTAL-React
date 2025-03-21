import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import "../styles/Profile.css";
const EmployerProfile = () => {
  const { user, updateProfile } = useContext(AppContext);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    companyWebsite: "",
    industry: "",
    address: "",
    logo: "",
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tempLogo, setTempLogo] = useState("");

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        companyName: user.companyName || "",
        companyWebsite: user.companyWebsite || "",
        industry: user.industry || "",
        address: user.address || "",
        logo: user.logo || "",
      });
    }
  }, [user]);

  const handleLogoClick = () => {
    setTempLogo(profile.logo);
    setIsPopupOpen(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveLogo = () => {
    setProfile({ ...profile, logo: tempLogo });
    setIsPopupOpen(false);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile.name || !profile.email || !profile.phone) {
      alert("Name, Email, and Phone are required.");
      return;
    }

    try {
      await updateProfile(profile);
    } catch (error) {
      alert("Failed to update profile. Please try again.");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Employer Profile</h2>
        <div className="profile-picture-container" onClick={handleLogoClick}>
          <img
            src={profile.logo || "https://via.placeholder.com/100"}
            alt="Company Logo"
            className="profile-picture"
          />
        </div>
      </div>

      {isPopupOpen && (
        <div className="profile-picture-popup">
          <div className="popup-content">
            <img
              src={tempLogo || "https://via.placeholder.com/200"}
              alt="Logo Preview"
              className="popup-profile-picture"
            />
            <label htmlFor="logo-upload" className="edit-icon">
              📎 Edit
            </label>
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
            <div className="popup-buttons">
              <button onClick={handleSaveLogo}>Save</button>
              <button onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
          readOnly
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Phone"
        />

        <label>Company Name</label>
        <input
          type="text"
          name="companyName"
          value={profile.companyName}
          onChange={handleChange}
          placeholder="Company Name"
        />

        <label>Company Website</label>
        <input
          type="text"
          name="companyWebsite"
          value={profile.companyWebsite}
          onChange={handleChange}
          placeholder="Company Website"
        />

        <label>Industry</label>
        <input
          type="text"
          name="industry"
          value={profile.industry}
          onChange={handleChange}
          placeholder="Industry"
        />

        <label>Address</label>
        <textarea
          name="address"
          value={profile.address}
          onChange={handleChange}
          placeholder="Address"
        ></textarea>

        <button type="submit" className="profile-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EmployerProfile;
