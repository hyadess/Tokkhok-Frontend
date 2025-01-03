// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faBars,
  faPlus,
  faSquarePlus,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import "../css/Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/signin",
        { email: email, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Login response:", response);
      login(response.data.session.access_token, response.data.session.user.id);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="whole">
      <div className="home-icon" onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faHouse} size="2x" />
      </div>
      <div class="login-container">
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <label for="email">Username</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div class="checkbox-container">
            <input type="checkbox" id="remember-me" />
            <label for="remember-me">Remember Me</label>
          </div>
          <button type="submit">LOGIN</button>
          <p className="little-text">
            Don't have an account?{" "}
            <button
              className="hover:underline hover:font-semibold"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </p>
          {/* go back to landing */}
        </form>
      </div>
    </div>
  );
};

export default Login;
