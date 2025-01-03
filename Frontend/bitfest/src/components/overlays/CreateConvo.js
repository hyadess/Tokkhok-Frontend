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

const CreateConvo = (props) => {
  // from props, we will get isOverlayVisible and toggleOverlay
  const { userId, token } = useAuth();
  const navigate = useNavigate();
  const [sessionName, setSessionName] = useState("");

  const convoCreateRequest = async () => {
    try {
      // Log the data before making the request
      console.log("Creating conversation with:", {
        name: sessionName,
        user_id: userId,
      });

      // Check if sessionName and userId are set
      if (!sessionName || !userId) {
        console.error("Session name or user ID is missing");
        return;
      }

      const url = "https://buet-genesis.onrender.com/api/v1/chats/"; // Replace with your actual endpoint URL
      const data = {
        user_id: userId,
        public_file_ids: [],
        chat_name: sessionName,
      };

      try {
        const response = await axios.put(url, data, {
          headers: {
            "Content-Type": "application/json", // Set appropriate headers
            Authorization: `Bearer ${token}`, // Pass the bearer token here
          },
        });

        props.toggleOverlay();
        setSessionName("");
        console.log(response);
        navigate(`/conversation/${response.data.id}`);
      } catch (error) {
        console.error(
          "Error creating conversation:",
          error.response ? error.response.data : error.message
        );
      }
    } catch (error) {
      console.error(
        "Error creating conversation:",
        error.response ? error.response.data : error.message
      );
    }

    return (
      <div
        className={`overlay ${props.isOverlayVisible ? "visible" : ""}`}
        id="overlay"
      >
        <div className="overlay-content">
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
              <textarea
                type="text"
                className="input-field"
                placeholder="Name your chatbot..."
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
              />
            </div>
            <button
              className="name-submit-buttond"
              onClick={() => convoCreateRequest()}
            >
              <FontAwesomeIcon icon={faPaperPlane} size="xs" />
            </button>
          </div>

        </div>
      </div>
    );
  };
};

export default CreateConvo;
