import React, { useState, useRef, useEffect } from "react";
// import "../css/Translator.css";

const Translator = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const messageListRef = useRef(null);

  // Hardcoded chat titles without messages
  const hardcodedChats = [
    { id: 1, title: "Amar Chat" },
    { id: 2, title: "Tomar Chat" },
    { id: 3, title: "Chat 3" },
  ];

  const hardcodedMessages = {
    1: [{ text: "Hello!", sender: "user" }, { text: "Hi there!", sender: "bot" }],
    2: [{ text: "How are you?", sender: "user" }, { text: "I'm fine, thanks!", sender: "bot" }],
    3: [{ text: "Translate this!", sender: "user" }, { text: "Translation done!", sender: "bot" }],
  };

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
    setChatHistory(hardcodedMessages[chat.id]);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredChats = hardcodedChats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGeneratePDF = () => {
    const hardcodedPdfLink =
      "https://drive.google.com/file/d/1_tYyacHrrXb17U4qEVrqICJHGvVFq8l1/view?usp=drive_link";
    window.open(hardcodedPdfLink, "_blank");
  };

  return (
    <div className="translator-container">
      <div className="sidebar">
        <h3 className="sidebar-title">Chat History</h3>
        <input
          type="text"
          className="search-bar"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="chat-list">
          {filteredChats.map((chat) => (
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
          <button className="generate-pdf-button" onClick={handleGeneratePDF}>
            PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Translator;
