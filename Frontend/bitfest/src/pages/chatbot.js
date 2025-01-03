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
const Convo = () => {
  // const { logout } = useAuth();
  // const { id } = useParams();
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   logout();
  //   navigate("/login");
  // };

  const [isLeftContracted, setIsLeftContracted] = useState(false);

  const handleLeftToggle = () => {
    setIsLeftContracted(!isLeftContracted);
  };

  const [currentQuestion, setCurrentQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [needanswer, setNeedanswer] = useState(0);
  const [isTutor, setIsTutor] = useState(false);
  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  // user asks question...............................................................................................

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      if (needanswer === 1) return;
      setNeedanswer(1);
      setMessages([
        ...messages,
        { text: newMessage, type: "text", sender: "user" },
      ]);
      setCurrentQuestion(newMessage);
      setNewMessage("");
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  // backend query...............................................................................................

  // const queryBackend = async () => {
  //   try {
  //     const response = await axios.post(`http://127.0.0.1:8002/test/query`, {
  //       conversation_id: id,
  //       question: currentQuestion,
  //       prompt: "answer the query",
  //     });
  //     //console.log(response.data);
  //     let newMessages = messages;
  //     response.data.messages.forEach((i) => {
  //       newMessages = [
  //         ...newMessages,
  //         {
  //           text: i.message,
  //           type: i.message_type,
  //           sender: "system",
  //         },
  //       ];
  //     });
  //     setMessages(newMessages);

  //     console.log(messages);
  //   } catch (error) {
  //     console.error(
  //       "Error querying backend:",
  //       error.response ? error.response.data : error.message
  //     );
  //   }
  // };


  const placeholderBackend = async () => {
    let newMessages = [
      ...messages,
      {
        text: "I am a placeholder",
        type: "text",
        sender: "system",
        pdfs: [
          {
            "title": "Placeholder PDF",
            "url": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          },
          {
            "title": "Another Placeholder PDF",
            "url": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          },
          {
            "title": "Yet Another Placeholder PDF",
            "url": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          },
        ],
      },
    ];
    setMessages(newMessages);
  };
  const handleGeneratePDF = () => {
    const hardcodedPdfLink =
      "https://drive.google.com/file/d/1_tYyacHrrXb17U4qEVrqICJHGvVFq8l1/view?usp=drive_link";
    window.open(hardcodedPdfLink, "_blank");
  };

  useEffect(() => {
    if (needanswer === 1) {
      //queryBackend();
      placeholderBackend();
      setNeedanswer(0);
      setCurrentQuestion("");
    }
  }, [messages]);

  // at start...............................................................................................

  // const loadConversation = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://127.0.0.1:8002/conversation/${id}/show`
  //     );
  //     let newMessages = [];
  //     response.data.turns.forEach((i) => {
  //       let sender = i.turn.sender;
  //       i.messages.forEach((j) => {
  //         newMessages = [
  //           ...newMessages,
  //           {
  //             text: j.message,
  //             type: j.message_type,
  //             sender: sender,
  //           },
  //         ];
  //       });
  //     });
  //     setMessages(newMessages);
  //     console.log(messages);
  //   } catch (error) {
  //     console.error(
  //       "Error loading conversation:",
  //       error.response ? error.response.data : error.message
  //     );
  //   }
  // };

  // useEffect(() => {
  //   loadConversation();
  // }, [id]);

  const parseResponse = (text, sender) => {
    const parts = text.split(/(```[\s\S]*?```)/);
    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        return (
          <pre key={index} className="code-block">
            <code>{part.slice(3, -3)}</code>
          </pre>
        );
      }
      return <div>{part}</div>;
    });
  };

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

export default Convo;
