import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./Base64ToAudioUS.css";

function Base64ToAudioUS() {
  const navigate = useNavigate();
  const [textInput, setTextInput] = useState("");
  const [base64Audio, setBase64Audio] = useState("");
  const [speed, setSpeed] = useState(1);
  const [languageCode, setLanguageCode] = useState("vi-VN");
  const [voiceName, setVoiceName] = useState("vi-VN-Neural2-D");

  return (
    <div className="container">
      <textarea
        rows={"30"}
        cols={"60"}
        placeholder={"Nhập vào đây Để nghe thử nha"}
        value={textInput}
        onChange={(e) => {
          setTextInput(e.target.value);
        }}
      ></textarea>

      <div className="btnGroup">
        <input
          placeholder="Speed"
          type={"number"}
          onChange={(e) => {
            const value = e.target.value;
            setSpeed(Number(value));
          }}
          value={speed}
        />

        <input
          placeholder="LanguageCode"
          type={"text"}
          onChange={(e) => {
            const value = e.target.value;
            setLanguageCode(value);
          }}
          value={languageCode}
        />

        <input
          placeholder="Voice Name"
          type={"text"}
          onChange={(e) => {
            const value = e.target.value;
            setVoiceName(value);
          }}
          value={voiceName}
        />

        <button
          onClick={() => {
            const regExp = /[a-zA-Z]/g;

            if (regExp.test(textInput)) {
              const myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");

              const raw = JSON.stringify({
                audioConfig: {
                  audioEncoding: "LINEAR16",
                  effectsProfileId: ["small-bluetooth-speaker-class-device"],
                  pitch: 0,
                  speakingRate: speed,
                },
                input: {
                  text: textInput,
                },
                voice: {
                  languageCode: languageCode,
                  name: voiceName,
                },
              });

              const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };

              fetch(
                "https://cxl-services.appspot.com/proxy?url=https://texttospeech.googleapis.com/v1beta1/text:synthesize&token=03ANYolquf_efs0-vgXjklkw2xrTL5osvzLZz3WBnXKWr6aZlSPtqNymu-0xRzreSsDOhU20MaC5jJ56QyUxQ2-jGgHQO5oBG2JL0izwQb6FAEYF_jFuBDPhDjOu4uWHSSCeh1V6Eer35Yf7QglJ9TT2bbhLweUlN3M5jdg2hrPqTBNNAa28qGe6O7vKKje08VUVloNnc5oRqx1EAgooWaVFsNOUo0EFIVd4ADUNlIp54KU6rDL2VEeswuw07SZgZCjJugcbxseDNU-89knsc5uSy_rtYVQal817IybuHIiS-MWxf4Nsfs25XC7slGgffu8HsQgL5B0tGUq1nzuQotUyW19jggUbnAE9t3VwrP8FBR6fyIdyHtMyUo4qvx83TvA-AmpxmxWapHTaEH1NFilnYCjpg_nUiLSq-KbJFOTXCGfC5AsPjp-v4ndTwTqAGnFWzNWfnwy4Rjr6BqpBp4h5GamPQqcE_vr4-kXeOAJXByRZDElMzjHli2mqucVtlYadx_Um5Jda3oMv759FZx_pw5N2d7U7cM0A",
                requestOptions
              )
                .then((response) => response.json())
                .then((result) => {
                  setBase64Audio(
                    "data:audio/mpeg;base64," + result["audioContent"]
                  );
                })
                .catch((error) => setTextInput(error));
            }
          }}
        >
          Ok
        </button>

        <button onClick={() => navigate("/tts_json")}>tts</button>

        <button
          onClick={() =>
            window.open(
              "https://www.gstatic.com/cloud-site-ux/text_to_speech/text_to_speech.min.html"
            )
          }
        >
          Google TTS
        </button>

        <button onClick={() => navigate("/home")}>Home</button>
      </div>

      <audio
        controls
        autoPlay
        src={base64Audio !== "" ? base64Audio : ""}
      ></audio>
    </div>
  );
}

export default Base64ToAudioUS;
