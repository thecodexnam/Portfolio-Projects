import React from 'react'
import "./App.css"
import Va from "./assets/ai.png"
import { CiMicrophoneOn } from 'react-icons/ci'


const App = () => {
  return (
    <div className="main">
      <img src={Va} alt="" srcset=""  id='salta'/>
      <span>I'm Salta Your virtual Assistant</span>
      <button>Click Here <CiMicrophoneOn/> </button>
    </div>
  )
}

export default App