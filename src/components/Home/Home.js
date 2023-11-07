import { useNavigate } from "react-router-dom";
// import { useState } from "react";

import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container_home">
      <button
        className="btn_getCmt"
        onClick={() => navigate("/TranslateSubtitle")}
      >
        Translate Subtitle
      </button>
      <button className="btn_getCmt" onClick={() => navigate("/getcommment")}>
        Get Comments
      </button>
      <button className="btn_getCmt" onClick={() => navigate("/gettranslate")}>
        Get Text Translate
      </button>
      <button className="btn_getCmt" onClick={() => navigate("/webtool")}>
        Edit text
      </button>
      <button className="btn_getCmt" onClick={() => navigate("/tts_json")}>
        TTS Json
      </button>
      <button className="btn_getCmt" onClick={() => navigate("/tts_us")}>
        TTS US
      </button>
      <button className="btn_getCmt" onClick={() => navigate("/webtool1")}>
        Test
      </button>

      <button className="btn_getCmt" onClick={() => navigate("/testvideo")}>
        Test Video
      </button>
    </div>
  );
}
