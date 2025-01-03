import { React, useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faBars,
  faPlus,
  faSquarePlus,
  faHouse,
  faChalkboard,
  faSubscript,
  faQuestion,
  faTrademark,
} from "@fortawesome/free-solid-svg-icons";
import "../css/ToolList.css";
import CreateConvo from "./overlays/CreateConvo";
import axios from "axios";

const ToolList = () => {
  // navigate to conversation
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [isTutor, setIsTutor] = useState(false);

  const gotToConversation = async () => {
    //navigate to conversation

    navigate(`/conversation/${userId}`);
  };

  return (
    <div className="tool-list-container">
      <div className="tool-list-title">OUR TOOLS</div>
      {/* <div className='horizontal-line'>

            </div> */}

      <div className="tool-list">
        <div className="tool-container" onClick={() => setIsTutor(true)}>
          {/* <div className='tool-image'>
                        <FontAwesomeIcon icon={faChalkboard} size='1x' />
                    </div> */}
          <div className="tool-text">
            <div className="tool-name">Chatbot</div>
          </div>
        </div>
      </div>
      <CreateConvo
        isOverlayVisible={isTutor}
        toggleOverlay={() => setIsTutor(false)}
      />
    </div>
  );
};

export default ToolList;
