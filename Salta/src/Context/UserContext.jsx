import React, { createContext } from "react";
import { askGemini } from "../Gemini.js"


export const DataContext = createContext();

const UserContext = ({ children }) => {

  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "en-GB";
    window.speechSynthesis.speak(text_speak);
  }

async function aiRespose(prompt){
  await askGemini(prompt)
}
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new SpeechRecognition();
recognition.onresult=(e)=>{
  let currentIndex = e.resultIndex
  let transcript = e.results[currentIndex][0].transcript
  console.log(transcript);
  aiRespose(transcript)
}

let value = {
  recognition
}



  return (
    <DataContext.Provider value={{ recognition, speak }}>
      {children}
    </DataContext.Provider>
  );
};

export default UserContext;
