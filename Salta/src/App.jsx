import React, { useContext } from "react";
import "./App.css";
import Va from "./assets/ai.png";
import { CiMicrophoneOn } from "react-icons/ci";
import { DataContext } from "./Context/UserContext";

const App = () => {
  const { recognition } = useContext(DataContext);

  const startListening = () => {
    if (recognition) {
      recognition.start();
    } else {
      alert("Speech Recognition not supported in this browser");
    }
  };

  return (
    <div className="main">
      <img src={Va} alt="Virtual Assistant" id="salta" />
      <span>I'm Salta, your Virtual Assistant</span>
      <button onClick={startListening}>
        Click Here <CiMicrophoneOn />
      </button>
    </div>
  );
};

export default App;
