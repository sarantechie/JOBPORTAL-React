import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import "./Navbar.css";
import { FaBell, FaTimes } from "react-icons/fa";

function Navbar() {
  const { user, logout, notifications } = useContext(AppContext);
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const handleLogout = () => {
    navigate("/");
    logout();
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationClick = async (notification) => {
    console.log("Notification clicked", notification);
  };

  const markAllAsRead = async () => {
    console.log("Marking all as read");
  };
  const navigateToLogin = () => {
    navigate("/login");
  };
  const navigateToRegister = () => {
    navigate("/register");
  };
  return (
    <>
      <nav className="job-portal-navbar">
        <div className="container">
          <div className="navbar-brand">
            <span className="logo">JobPortal</span>
          </div>

          <div className="navbar-links">
            <Link
              to="/"
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className={`nav-link ${
                location.pathname === "/jobs" ? "active" : ""
              }`}
            >
              Jobs
            </Link>

            {user && user?.role === "employer" ? (
              <Link to="/post-job"  className={`nav-link ${
                location.pathname === "/post-job" ? "active" : ""
              }`}>
                Post Job
              </Link>
            ) : null}

            {user ? (
              <>
                <Link to="/my-jobs"  className={`nav-link ${
                location.pathname === "/my-jobs" ? "active" : ""
              }`}>
                  My Jobs
                </Link>
                <Link to="/profile"  className={`nav-link ${
                location.pathname === "/profile" ? "active" : ""
              }`}>
                  Profile
                </Link>
                {/* <li className="notification-icon">
                  <button onClick={toggleNotifications} className="icon-button">
                    <FaBell size={20} />
                    {notifications && (
                      <span className="notification-badge">
                        {notifications.length}
                      </span>
                    )}
                  </button>
                </li> */}
                <button className="login-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/about" className={`nav-link ${
                location.pathname === "/about" ? "active" : ""
              }`}>
                  About Us
                </Link>
                <Link to="/contact" className={`nav-link ${
                location.pathname === "/contact" ? "active" : ""
              }`}>
                  Contact Us
                </Link>
                <button className="login-btn" onClick={navigateToLogin}>
                  Login
                </button>
                <button className="register-btn" onClick={navigateToRegister}>
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className={`notification-drawer ${showNotifications ? "open" : ""}`}>
        <div className="drawer-header">
          <h3>Notifications</h3>
          <div className="drawer-actions">
            <button onClick={markAllAsRead} className="mark-all-read">
              Mark all as read
            </button>
            <button onClick={toggleNotifications} className="close-drawer">
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="notifications-list">
          {notifications ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${
                  notification.isRead ? "read" : "unread"
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="notification-content">
                  <p>{notification.message}</p>
                  <small>
                    {new Date(notification.createdAt).toLocaleString()}
                  </small>
                </div>
              </div>
            ))
          ) : (
            <p className="no-notifications">No notifications yet</p>
          )}
        </div>
      </div>

      {/* Overlay when drawer is open */}
      {showNotifications && (
        <div className="drawer-overlay" onClick={toggleNotifications}></div>
      )}
    </>
  );
}

export default Navbar;
