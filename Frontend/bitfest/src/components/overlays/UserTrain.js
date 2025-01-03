import { React, useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faBars,
  faPlus,
  faSquarePlus,
  faHouse,
  faCross,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./CreateConvo.css";

const UserTrain = (props) => {
  // from props, we will get isOverlayVisible and toggleOverlay
  const { userId, token } = useAuth();
  const navigate = useNavigate();
  const [banglish, setBanglish] = useState("");
  const [bangla, setBangla] = useState("");

  const convoCreateRequest = async () => {
    try {
      // Log the data before making the request
      console.log("Creating conversation with:", {
        banglish: banglish,
        bangla: bangla,
        user_id: userId,
      });

      if (!banglish || !bangla || !userId) {
        console.error("Something is missing");
        return;
      }

      const url = "https://buet-genesis.onrender.com/api/v1/usertrain/"; // Replace with your actual endpoint URL
      const data = {
        user_id: userId,
        banglish: banglish,
        bangla: bangla,
      };

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json", // Set appropriate headers
          Authorization: `Bearer ${token}`, // Pass the bearer token here
        },
      });

      props.toggleOverlay();
      setBanglish("");
      setBangla("");
      console.log(response);
      navigate(`/home`);
    } catch (error) {
      console.error(
        "Error creating conversation:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div
      className={`overlay ${props.isOverlayVisible ? "visible" : ""}`}
      id="overlay"
    >
      <div className="overlay-content-2">
        <div className="overlay-cross-button-container">
          <div
            className="overlay-cross-button"
            onClick={() => props.toggleOverlay()}
          >
            <FontAwesomeIcon icon={faClose} size="1x" />
          </div>
        </div>

        {/* <div className='session-text'>ENTER SESSION NAME</div> */}

        <div className="flex-div">
          <div>
            <div className="session-text">Banglish</div>
            <div>
              <textarea
                type="text"
                className="input-field-2"
                value={banglish}
                onChange={(e) => setBanglish(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="session-text">Bangla</div>
            <div>
              <textarea
                type="text"
                className="input-field-2"
                value={bangla}
                onChange={(e) => setBangla(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button
          className="name-submit-buttond"
          onClick={() => convoCreateRequest()}
        >
          <FontAwesomeIcon icon={faPaperPlane} size="xs" />
        </button>
      </div>
    </div>
  );
};

export default UserTrain;
