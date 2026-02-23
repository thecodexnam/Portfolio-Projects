import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate()
  let [input, setInput] = useState("");
  console.log(input);

  const handleJoin = () => {
    navigate(`/room/${input}`)
  }

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Connect Instantly</h1>
        <p className="home-subtitle">Enter a room ID to start video calling</p>

        <div className="input-group">
          <input
            type="text"
            className="room-input"
            placeholder="Enter Room ID"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleJoin} className="join-btn">Join Now</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
