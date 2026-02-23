import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams, useNavigate } from "react-router-dom";
import "./VideoRoom.css";

const VideoRoom = () => {
  const { roomID } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const zpRef = useRef(null);

  useEffect(() => {
    const myMeeting = async (element) => {
      const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
      const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        Date.now().toString(),
        "Naman"
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zpRef.current = zp;

      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: "Copy link",
            url: `${window.location.origin}/room/${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
      });
    };

    if (containerRef.current && !zpRef.current) {
      myMeeting(containerRef.current);
    }

    return () => {
      if (zpRef.current) {
        zpRef.current = null;
      }
    };
  }, [roomID]);

  return (
    <div className="room-container">
      <header className="room-header">
        <button onClick={() => navigate("/")} className="back-button">
          &larr; Back to Home
        </button>
        <div className="room-id-badge">
          Room: {roomID}
        </div>
      </header>
      <div
        ref={containerRef}
        className="video-container"
      />
    </div>
  );
};

export default VideoRoom;


