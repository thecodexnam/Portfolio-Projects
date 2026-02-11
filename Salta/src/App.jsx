import React, { useContext } from "react";
import "./App.css";
import Va from "./assets/ai.png";
import { CiMicrophoneOn } from "react-icons/ci";
import { DataContext } from "./Context/UserContext";

import React, { useContext } from "react";
import "./App.css";
import Va from "./assets/ai.png";
import { CiMicrophoneOn } from "react-icons/ci";
import { FaStop } from "react-icons/fa";
import { DataContext } from "./Context/UserContext";

const App = () => {
  const { recognition, speaking, listening, prompt, response, stopSpeaking, speak } = useContext(DataContext);

  const startListening = () => {
    if (recognition) {
      try {
        recognition.start();
      } catch (error) {
        // Usually happens if already started
        console.log("Recognition potentially already started");
      }
    } else {
      alert("Speech Recognition not supported in this browser");
    }
  };

  return (
    <div className="main">
      <img src={Va} alt="Virtual Assistant" id="salta" />
      <span>I'm Salta, your Virtual Assistant</span>

      <div className="interaction-container">
        {!speaking ? (
          <button onClick={startListening} className={`mic-btn ${listening ? 'listening' : ''}`}>
            {listening ? "Listening..." : "Click Here"} <CiMicrophoneOn />
          </button>
        ) : (
          <button onClick={stopSpeaking} className="stop-btn">
            Stop <FaStop />
          </button>
        )}
      </div>

      {(prompt || response) && (
        <div className="conversation-box">
          {prompt && <p className="user-prompt">You: {prompt}</p>}
          {response && <p className="ai-response">Salta: {response}</p>}
        </div>
      )}

    </div>
  );
};

export default App;
