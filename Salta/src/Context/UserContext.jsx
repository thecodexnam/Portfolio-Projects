import React, { createContext, useState, useEffect } from "react";
import { askGemini } from "../Gemini.js"


export const DataContext = createContext();

const UserContext = ({ children }) => {
  const [recognition, setRecognition] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  function speak(text) {
    window.speechSynthesis.cancel(); // Cancel any previous speech
    setSpeaking(true);
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "en-GB";

    text_speak.onend = () => {
      setSpeaking(false);
    };

    window.speechSynthesis.speak(text_speak);
  }

  function stopSpeaking() {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  async function aiResponse(prompt) {
    if (!prompt) return;
    setResponse("Thinking...");
    const text = await askGemini(prompt);
    if (text) {
      setResponse(text);
      speak(text);
    }
  }

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();

      // Configure recognition if needed (e.g., maintain continuous listening or one-shot)
      // recognitionInstance.continuous = false;

      recognitionInstance.onstart = () => {
        setListening(true);
        setPrompt("Listening...");
      };

      recognitionInstance.onend = () => {
        setListening(false);
      };

      recognitionInstance.onresult = (e) => {
        const currentIndex = e.resultIndex;
        const transcript = e.results[currentIndex][0].transcript;
        console.log("Transcript:", transcript);
        setPrompt(transcript);
        aiResponse(transcript);
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setListening(false);
        setPrompt("Error listening, please try again.");
      };

      setRecognition(recognitionInstance);
    } else {
      console.error("Speech Recognition not supported in this browser.");
    }
  }, []);

  let value = {
    recognition,
    speak,
    speaking,
    listening,
    prompt,
    response,
    stopSpeaking
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default UserContext;

