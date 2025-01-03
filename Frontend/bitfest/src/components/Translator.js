import React, { useState, useRef, useEffect } from "react";
import PDFViewer from "pdf-viewer-reactjs";
import "../css/Translator.css";

const Translator = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showPDF, setShowPDF] = useState(false);

  const messageListRef = useRef(null);

  const hardcodedChats = [
    { id: 1, title: "Chat 1" },
    { id: 2, title: "Chat 2" },
    { id: 3, title: "Chat 3" },
  ];

  const hardcodedMessages = {
    1: [{ text: "Hello!", sender: "user" }, { text: "Hi there!", sender: "bot" }],
    2: [{ text: "How are you?", sender: "user" }, { text: "I'm fine, thanks!", sender: "bot" }],
    3: [{ text: "Translate this!", sender: "user" }, { text: "Translation done!", sender: "bot" }],
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat.id);
    setChatHistory(hardcodedMessages[chat.id]);
    setShowPDF(false); // Ensure PDF view is closed when switching chats
  };

  const handleShowPDF = () => {
    setShowPDF(true);
  };

  return (
    <div className="translator-container">
      <div className="sidebar">
        <h3 className="sidebar-title">Chat History</h3>
        <div className="chat-list">
          {hardcodedChats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${
                selectedChat === chat.id ? "selected" : ""
              }`}
              onClick={() => handleSelectChat(chat)}
            >
              {chat.title}
            </div>
          ))}
        </div>
        <button className="show-pdf-button" onClick={handleShowPDF}>
          View PDF
        </button>
      </div>
      <div className="chat-section">
        {showPDF ? (
          <PDFViewer
            document={{
              url: "https://example.com/sample.pdf", // Replace with your PDF URL
            }}
            navbarOnTop={true}
          />
        ) : (
          <>
            <div className="chat-window" ref={messageListRef}>
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    msg.sender === "user" ? "user" : "bot"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="input-section">
              <textarea
                className="chat-input"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type a message in English..."
              ></textarea>
              <button className="translate-button">
                ➤
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Translator;
