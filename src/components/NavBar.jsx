import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import "../styles/Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AppContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/"); // Navigate to home if user is null
  //   }
  // }, [user]);
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">JobPortal</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        {user && user?.role === "employer" ? (
          <>
            <li>
              <Link to="/post-job">Post Job</Link>
            </li>
          </>
        ) : null}
        {user ? (
          <>
            <li>
              <Link to="/jobs">My Jobs</Link>
            </li>
            <li>
              <Link to="/Profile">Profile</Link>
            </li>
            <li>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
