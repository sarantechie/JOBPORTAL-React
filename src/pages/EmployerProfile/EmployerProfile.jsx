import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import "./EmployerProfile.css";
const EmployerProfile = () => {
  const { user, updateProfile } = useContext(AppContext);
  const [profile, setProfile] = useState({
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
        <h2>Profile</h2>
        <div className="profile-picture-container" onClick={handleLogoClick}>
          {profile.logo ? (
            <img
              src={profile.logo || "https://via.placeholder.com/100"}
              alt="Company Logo"
              className="profile-picture"
            />
          ) : (
            <div className="popup-placeholder">
              {profile.companyName?.charAt(0) || "?"}
            </div>
          )}
        </div>
      </div>

      {isPopupOpen && (
        <div className="profile-picture-popup">
          <div className="popup-content">
            <div className="popup-image-container">
              {tempLogo ? (
                <img
                  src={tempLogo}
                  alt="Logo Preview"
                  className="popup-profile-picture"
                  onLoad={(e) => {
                    // Ensure image fits container
                    e.target.style.objectFit = "cover";
                    e.target.style.objectPosition = "center";
                  }}
                />
              ) : (
                <div className="popup-placeholder">
                  {profile.companyName?.charAt(0) || "?"}
                </div>
              )}
            </div>

            <div className="file-input-wrapper">
              <label htmlFor="logo-upload" className="edit-icon">
                Select Logo
              </label>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>

            <div className="popup-buttons">
              <button onClick={handleSaveLogo}>Upload</button>
              <button onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <form className="profile-form" onSubmit={handleSubmit}>
        <label>Company Name</label>
        <input
          type="text"
          name="companyName"
          value={profile.companyName}
          onChange={handleChange}
          placeholder="Company Name"
          required
          readOnly
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

        {/* <label>Company Name</label>
        <input
          type="text"
          name="companyName"
          value={profile.companyName}
          onChange={handleChange}
          placeholder="Company Name"
        /> */}

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
