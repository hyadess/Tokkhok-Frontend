// src/components/Signup.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faBars,
  faPlus,
  faSquarePlus,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/signup",
        { email: email, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Signup response:", response);
      if( response.data.message=="User signed up successfully")
      {
        navigate("/login");
      }
      else
      {
        console.log("Signup failed:", response.data.message);

      }
    } catch (error) {
      console.error("Singup failed:", error);
    }
  };

  return (
    <div className="whole">
      <div className="home-icon" onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faHouse} size="2x" />
      </div>

      <div className="login-container">
        <h2>SIGNUP</h2>
        <form onSubmit={handleSubmit}>
          <label for="email">Email</label>
          <input
            className="h-[45px] mb-2 p-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            required
          />
          <label for="password">Password</label>
          <input
            className="h-[45px] mb-2 p-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            required
          />

          <button type="submit">SIGNUP</button>
          <p className="little-text">
            Already have an account?{" "}
            <button
              className="hover:underline hover:font-semibold sm"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
