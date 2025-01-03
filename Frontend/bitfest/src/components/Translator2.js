import React, { useState, useRef, useEffect } from "react";
import "../css/Translator2.css";

const Translator = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const messageListRef = useRef(null);

  // Hardcoded chat histories
  const hardcodedHistories = [
    { id: 1, title: "Chat 1", messages: [{ text: "Hello!", sender: "user" }] },
    { id: 2, title: "Chat 2", messages: [{ text: "How are you?", sender: "user" }] },
    { id: 3, title: "Chat 3", messages: [{ text: "Translate this!", sender: "user" }] },
  ];

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleTranslate = () => {
    if (userMessage.trim() !== "") {
      const newChatHistory = [
        ...chatHistory,
        { text: userMessage, sender: "user" },
      ];
      setChatHistory(newChatHistory);
      setUserMessage("");

      // Hardcoded translation response
      const hardcodedTranslation = "এই বাক্যটি বাংলায় অনুবাদ করা হয়েছে।";

      setChatHistory([
        ...newChatHistory,
        { text: hardcodedTranslation, sender: "bot" },
      ]);
    }
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat.id);
    setChatHistory(chat.messages);
  };

  return (
    <div className="translator-container">
      <div className="sidebar">
        <h3 className="sidebar-title">Chat History</h3>
        <div className="chat-list">
          {hardcodedHistories.map((chat) => (
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
      </div>
      <div className="chat-section">
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
          <button className="translate-button" onClick={handleTranslate}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Translator;
