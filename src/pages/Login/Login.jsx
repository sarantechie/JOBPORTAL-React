import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import "./Login.css";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const clientId =
  "112310389296-usiih97v8r3oi4brpmhcc3h4diha72e3.apps.googleusercontent.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, googleLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };

  const handleSuccess = async (response) => {
    try {
      const decodedToken = jwtDecode(response.credential);
      ("Google User Info:", decodedToken);
      await googleLogin(response.credential);
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* <a href="/forgot-password" className="forgot-password">
          Forgot password?
        </a> */}
        <button type="submit">Login</button>
      </form>
      <div className="divider">or</div>
      <div className="google-login-container">
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log("Login Failed")}
            width="300"
            size="large"
            shape="rectangular"
            theme="filled_blue"
          />
        </GoogleOAuthProvider>
      </div>
      <p className="register-link">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
