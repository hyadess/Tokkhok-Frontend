// src/components/Dashboard.js
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
  faEye,
  
} from "@fortawesome/free-solid-svg-icons";
import "../css/Convo.css";
import axios from "axios";
import ConvoLineList from "../components/sideLine/sideline";
const Profile = () => {
  // const { logout } = useAuth();
  // const { id } = useParams();
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   logout();
  //   navigate("/login");
  // };


  // user asks question...............................................................................................

  const [myPdfs, setMyPdfs] = useState([]);
  const [AllowedPublicPdfs, setAllowedPublicPdfs] = useState([]);
  const [myEditors, setMyEditors] = useState([]);
  const [sharedEditors, setSharedEditors] = useState([]);
  const [totalTranslations, setTotalTranslations] = useState([]);
  



  useEffect(() => {
    if (needanswer === 1) {
      //queryBackend();
      placeholderBackend();
      setNeedanswer(0);
      setCurrentQuestion("");
    }
  }, [messages]);


  return (
    <div className="container-diff">
      <div className={`left ${isLeftContracted ? "contracted" : ""}`}>
        <div>
          <button className="menu-button" onClick={handleLeftToggle}>
            <FontAwesomeIcon icon={faBars} size="2x" />
          </button>
        </div>
        {/* <div className='new-convo'>
          <h3 className={`new-convo-text ${isLeftContracted ? 'contracted' : ''}`}>New Conversation</h3>
          <button className='menu-button add-button' onClick={() => setIsTutor(true)}><FontAwesomeIcon icon={faSquarePlus} size='2x' /></button>
        </div> */}

        <div className={`${isLeftContracted ? "convo-list-contracted" : ""}`}>
          <ConvoLineList current={1} />
        </div>

        <div className="new-convo last">
          {/* <h3 className={`new-convo-text ${isLeftContracted ? 'contracted' : ''}`}>Back-to home</h3> */}
          <button
            className="menu-button home-button"
            onClick={() => navigate("/home")}
          >
            <FontAwesomeIcon icon={faHouse} style={{ fontSize: "26px" }} />
          </button>
        </div>

        {/* <CreateConvo
          isOverlayVisible={isTutor}
          toggleOverlay={() => setIsTutor(false)}
        /> */}
      </div>

      <div className={`middle ${isLeftContracted ? "contracted" : ""}`}>
        <div
          className={`chat-container ${isLeftContracted ? "contracted" : ""}`}
          ref={messageListRef}
        >
          {messages.map((message, index) =>
            message.type === "text" ? (
              <div className={`chat-message ${message.sender}`}>
                {parseResponse(message.text, message.sender)}
                {/* add the pdfs as a series of tablets */}
                {message.pdfs ? (
                  <div className="pdfs-tablets">
                    {message.pdfs.map((pdf) => (
                      <div className="pdf-tablet">
                        <a href={pdf.url} target="_blank" rel="noreferrer">
                          {pdf.title}
                        </a>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <img
                src={message.text}
                alt="image"
                className={`chat-message ${message.sender}`}
              />
            )
          )}
        </div>
        <div
          className={`input-container ${isLeftContracted ? "contracted" : ""}`}
        >
          <button className ="pdf-show" onClick={handleGeneratePDF}>
          <FontAwesomeIcon icon={faEye} size="2x"/>
          </button>
          <textarea
            type="text"
            className="chat-input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />

          <button className="send-button" onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} size="2x" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
