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
import UserTrain from "./overlays/UserTrain";
import axios from "axios";

const ToolList = () => {
  // navigate to conversation
  const navigate = useNavigate();
  //const { userId } = useAuth();
  const [isTutor, setIsTutor] = useState(false);
  const [isUserTrain, setIsUserTrain] = useState(false);
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

        <div className="tool-container" onClick={() => navigate(`/translate`)}>
          {/* <div className='tool-image'>
                        <FontAwesomeIcon icon={faChalkboard} size='1x' />
                    </div> */}
          <div className="tool-text">
            <div className="tool-name">Audio Chat</div>
          </div>
        </div>
        <div className="tool-container" onClick={() => navigate(`/notes-create`)}>
          {/* <div className='tool-image'>
                        <FontAwesomeIcon icon={faChalkboard} size='1x' />
                    </div> */}
          <div className="tool-text">
            <div className="tool-name">Smart Text Editor</div>
          </div>
        </div>

        <div className="tool-container" onClick={() => setIsUserTrain(true)}>
          {/* <div className='tool-image'>
                        <FontAwesomeIcon icon={faChalkboard} size='1x' />
                    </div> */}
          <div className="tool-text">
            <div className="tool-name">HELP US IMPROVE</div>
          </div>
        </div>
      </div>
      <CreateConvo
        isOverlayVisible={isTutor}
        toggleOverlay={() => setIsTutor(false)}
      />
      <UserTrain
        isOverlayVisible={isUserTrain}
        toggleOverlay={() => setIsUserTrain(false)}/>
    </div>
  );
};

export default ToolList;
