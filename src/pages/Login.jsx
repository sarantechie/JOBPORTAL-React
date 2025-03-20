import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import "../styles/Login.css";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {jwtDecode } from "jwt-decode";

const clientId =
  "112310389296-usiih97v8r3oi4brpmhcc3h4diha72e3.apps.googleusercontent.com";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login,googleLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };

  const handleSuccess = async(response) => {
    try {
      const decodedToken = jwtDecode(response.credential);
      console.log("Google User Info:", decodedToken);

      // Send the token to backend for verification
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
        <button type="submit">Login</button>
      
      </form>
      <GoogleOAuthProvider clientId={clientId}>
          <div>
            {/* <h2>Login with Google</h2> */}
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => console.log("Login Failed")}
            />
          </div>
        </GoogleOAuthProvider>
    </div>
  );
}

export default Login;
