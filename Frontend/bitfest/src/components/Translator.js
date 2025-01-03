import React, { useState, useRef, useEffect } from "react";

import "../css/Translator2.css";

const Translator = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const messageListRef = useRef(null);

  const handleTranslate = () => {
    if (userMessage.trim() !== "") {
      const newChatHistory = [
        ...chatHistory,
        { text: userMessage, sender: "user" },
      ];
      setChatHistory(newChatHistory);
      setUserMessage("");

      // Simulated translation response
      const hardcodedTranslation = "এই বাক্যটি বাংলায় অনুবাদ করা হয়েছে।";

      setChatHistory([
        ...newChatHistory,
        { text: hardcodedTranslation, sender: "bot" },
      ]);
    }
  };

  const handleAudioRecord = () => {
    if (!isRecording) {
      // Start recording
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;
          audioChunksRef.current = [];

          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              audioChunksRef.current.push(event.data);
            }
          };

          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
            const blobUrl = URL.createObjectURL(audioBlob); // Create Blob URL for local use
            console.log("Audio Blob URL:", blobUrl);
            // Add audio message to chat history
            setChatHistory((prevHistory) => [
              ...prevHistory,
              { text: blobUrl, sender: "user", isAudio: true },
            ]);
          };

          mediaRecorder.start();
          setIsRecording(true);
        })
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
    } else {
      // Stop recording
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="translator-container">
      <div className="sidebar">
        <h3 className="sidebar-title">Chat History</h3>
        <input
          type="text"
          className="search-bar"
          placeholder="Search chats..."
        />
        <div className="chat-list">
          <div className="chat-item">Amar Chat</div>
          <div className="chat-item">Tomar Chat</div>
          <div className="chat-item">Chat 3</div>
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
              {msg.isAudio ? (
                <audio controls src={msg.text}></audio>
              ) : (
                msg.text
              )}
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
          <button className="microphone-button" onClick={handleAudioRecord}>
            {isRecording ? "🎤 Recording..." : "🎤"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Translator;
