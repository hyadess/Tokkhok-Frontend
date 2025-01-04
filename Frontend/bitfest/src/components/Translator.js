// import React, { useState, useRef } from "react";
// import { useAuth } from "../context/AuthContext";
// import "../css/Translator2.css";

// const Translator = () => {
//   const [userMessage, setUserMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioBlobUrl, setAudioBlobUrl] = useState(null); // To store WebM Blob URL
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const messageListRef = useRef(null);
//   const {userId} = useAuth();

//   const handleTranslate = () => {
//     if (userMessage.trim() !== "") {
//       const newChatHistory = [
//         ...chatHistory,
//         { text: userMessage, sender: "user" },
//       ];
//       setChatHistory(newChatHistory);
//       setUserMessage("");

//       // Simulated translation response
//       const hardcodedTranslation = "এই বাক্যটি বাংলায় অনুবাদ করা হয়েছে।";

//       setChatHistory([
//         ...newChatHistory,
//         { text: hardcodedTranslation, sender: "bot" },
//       ]);
//     }
//   };

//   const handleAudioRecord = () => {
//     if (!isRecording) {
//       // Start recording
//       navigator.mediaDevices
//         .getUserMedia({ audio: true })
//         .then((stream) => {
//           const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
//           mediaRecorderRef.current = mediaRecorder;
//           audioChunksRef.current = [];

//           mediaRecorder.ondataavailable = (event) => {
//             if (event.data.size > 0) {
//               audioChunksRef.current.push(event.data);
//             }
//           };

//           mediaRecorder.onstop = async () => {
//             const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
//             const blobUrl = URL.createObjectURL(audioBlob); // Create Blob URL for local use
//             setAudioBlobUrl(blobUrl); // Save WebM Blob URL for download

//             // Add audio message to chat history
//             setChatHistory((prevHistory) => [
//               ...prevHistory,
//               { text: blobUrl, sender: "user", isAudio: true },
//             ]);

//             // Send the WebM blob to the backend
//             sendAudioToBackend(audioBlob);
//           };

//           mediaRecorder.start();
//           setIsRecording(true);
//         })
//         .catch((error) => {
//           console.error("Error accessing microphone:", error);
//         });
//     } else {
//       // Stop recording
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   const sendAudioToBackend = async (audioBlob) => {
//     try {
//       const formData = new FormData();
//       formData.append("file", audioBlob, "recording.webm");
//       formData.append("user_id", userId);
  
//       const response = await fetch("https://buet-genesis.onrender.com/api/v1/audio_chat", {
//         method: "POST",
//         body: formData,
//       });
  
//       if (response.ok) {
//         const result = await response.json();
//         console.log("File uploaded successfully:", result);
//         // Process the result, e.g., update the chat history with the transcription
//         setChatHistory((prevHistory) => [
//           ...prevHistory,
//           { text: result.transcription || "No transcription available", sender: "bot" },
//         ]);
//       } else {
//         console.error("Failed to upload audio file:", await response.text());
//       }
//     } catch (error) {
//       console.error("Error uploading audio file:", error);
//     }
//   };
  

//   return (
//     <div className="translator-container">
//       <div className="translator-sidebar">
//         <h3 className="translator-sidebar-title">Chat History</h3>
//         <input
//           type="text"
//           className="translator-search-bar"
//           placeholder="Search chats..."
//         />
//         <div className="translator-chat-list">
//           <div className="translator-chat-item">Amar Chat</div>
//           <div className="translator-chat-item">Tomar Chat</div>
//           <div className="translator-chat-item">Chat 3</div>
//         </div>
//       </div>
//       <div className="translator-chat-section">
//         <div className="translator-chat-window" ref={messageListRef}>
//           {chatHistory.map((msg, index) => (
//             <div
//               key={index}
//               className={`chat-message ${
//                 msg.sender === "user" ? "user" : "bot"
//               }`}
//             >
//               {msg.isAudio ? (
//                 <audio controls src={msg.text}></audio>
//               ) : (
//                 msg.text
//               )}
//             </div>
//           ))}
//         </div>
//         <div className="translator-input-section">
//           <textarea
//             className="translator-chat-input"
//             value={userMessage}
//             onChange={(e) => setUserMessage(e.target.value)}
//             placeholder="Type a message in English..."
//           ></textarea>
//           <button className="translator-translate-button" onClick={handleTranslate}>
//             ➤
//           </button>
//           <button className="translator-microphone-button" onClick={handleAudioRecord}>
//             {isRecording ? "🎤 Recording..." : "🎤"}
//           </button>
//           {audioBlobUrl && (
//             <a href={audioBlobUrl} download="recording.webm" className="translator-download-button">
//               Download WebM
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Translator;
