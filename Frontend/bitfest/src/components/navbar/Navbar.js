import { React, useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faBars,
  faPlus,
  faSquarePlus,
  faHouse,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import "./Navbar.css";

const Navbar = () => {
  const { logout, userId } = useAuth();
  const navigate = useNavigate();

  const [selected, setSelected] = useState("home");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const homeClick = () => {
    setSelected("home");
    navigate("/home");
  };
  

  return (
    <div className="navbar items-center">
      <h2
        className="navbar-logo-name flex items-center cursor"
        onClick={() => navigate("/home")}
      >
        Code Tutor
      </h2>

      <div className="flex items-center">
        {userId === null ? (
          <div
            className="navbar-last button-text"
            onClick={() => navigate("/login")}
          >
            LOGIN
          </div>
        ) : (
          <>
            <div className="navbar-last">
              <button
                className="user-button-container"
                onClick={() => navigate(`/profile/${userId}`)}
              >
                <FontAwesomeIcon icon={faUser} size="2x" />
              </button>
              <button className="user-button-container" onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} size="2x" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
