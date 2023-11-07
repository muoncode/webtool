import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

import "./TestVideo.css";

function TestVideo() {
  const navigate = useNavigate();
  const [videoSrc, setVideoSrc] = useState("");
  const videoObj = useRef();

  return (
    <div className="tcontainer">
      <div className="testvideo">
        <input
          type="file"
          onChange={(e) => {
            const url = URL.createObjectURL(e.target.files[0]);
            // const file = e.target.files[0];
            setVideoSrc(url);
          }}
        />
        <video
          ref={videoObj}
          src={videoSrc ? videoSrc : null}
          controls
          autoPlay
          onLoadedData={() => {
            console.log("Đã phát video");
          }}
        />
      </div>
      <button onClick={() => navigate("/home")}>Menu</button>
    </div>
  );
}

export default TestVideo;
