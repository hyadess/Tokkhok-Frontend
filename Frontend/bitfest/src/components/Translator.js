import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import "../css/Translator2.css";

// Import responsiveVoice.js
// import "https://code.responsivevoice.org/responsivevoice.js";

const Translator = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const messageListRef = useRef(null);
  const { userId } = useAuth();

  const speakBangla = (text) => {
    if (window.responsiveVoice) {
      console.log("Text to speak:", text);
      window.responsiveVoice.speak(text, "Bangla Bangladesh Female");
    } else {
      console.error("TTS library is not loaded. Ensure the script is added in index.html.");
    }
  };
  

  

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(
          `https://buet-genesis.onrender.com/api/v1/audio_chat/user/${userId}`
        );

        if (response.ok) {
          const data = await response.json();
          const formattedHistory = data.map((item) => ({
            text: item.response,
            sender: "bot",
          }));
          setChatHistory(formattedHistory);
        } else {
          console.error("Failed to fetch chat history.");
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [userId]);

  

  const handleAudioRecord = () => {
    if (!isRecording) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
          mediaRecorderRef.current = mediaRecorder;
          audioChunksRef.current = [];

          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              audioChunksRef.current.push(event.data);
            }
          };

          mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
            const blobUrl = URL.createObjectURL(audioBlob);
            setAudioBlobUrl(blobUrl);

            const newUserMessage = { text: blobUrl, sender: "user", isAudio: true };
            setChatHistory((prevHistory) => [...prevHistory, newUserMessage]);

            sendAudioToBackend(audioBlob);
          };

          mediaRecorder.start();
          setIsRecording(true);
        })
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
    } else {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendAudioToBackend = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.webm");
      formData.append("user_id", userId);

      const response = await fetch("https://buet-genesis.onrender.com/api/v1/audio_chat", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Backend response:", result); // Log full response for debugging

        const transcription = result;

        const botResponse = { text: transcription, sender: "bot" };

        // Trigger TTS for Bangla text
        speakBangla(transcription);

        setChatHistory((prevHistory) => [...prevHistory, botResponse]);
      } else {
        const errorMessage = { text: "Failed to process audio. Please try again.", sender: "bot" };
        setChatHistory((prevHistory) => [...prevHistory, errorMessage]);
      }
    } catch (error) {
      console.error("Error uploading audio file:", error);
      const errorMessage = { text: "An error occurred while processing the audio.", sender: "bot" };
      setChatHistory((prevHistory) => [...prevHistory, errorMessage]);
    } finally {
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <div className="translator-container">
      <div className="translator-chat-section">
        <div className="translator-chat-window" ref={messageListRef}>
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`translator-chat-message ${
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
        <div className="translator-input-section">
          <textarea
            className="translator-chat-input"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type a message in English..."
          ></textarea>
          <button className="translator-translate-button" onClick={() => {
          }}>
            ➤
          </button>
          <button className="translator-microphone-button" onClick={handleAudioRecord}>
            {isRecording ? "🎤 Recording..." : "🎤"}
          </button>
          {audioBlobUrl && (
            <a
              href={audioBlobUrl}
              download="recording.webm"
              className="translator-download-button"
            >
              Download WebM
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Translator;
