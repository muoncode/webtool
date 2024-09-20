import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveAs } from "file-saver";

import "./Base64ToAudio.css";

function Base64ToAudio() {

  const navigate = useNavigate();

  const [base64Audio, setBase64Audio] = useState("");
  const [textInput, setTextInput] = useState(
    JSON.stringify({
      audioConfig: {
        audioEncoding: "LINEAR16",
        effectsProfileId: ["small-bluetooth-speaker-class-device"],
        pitch: 0,
        speakingRate: 1,
      },
      voice: {
        languageCode: "en-US",
        name: "en-US-Studio-M",
      },
      input: {
        text: "",
      },
    })
  );

  return (
    <div className="container_base64_to_audio">
      <textarea
        rows={"36"}
        cols={"112"}
        placeholder={"Nhập vào đây nha"}
        value={textInput}
        onChange={(e) => {
          setTextInput(e.target.value);
        }}
      ></textarea>

      <div className="btnGroup_tts">

      <button onClick={() => setBase64Audio(textInput.slice(1, -1))}>Audio Base64</button>

        <button
          onClick={() => {
            const regExp = /[a-zA-Z]/g;

            if (regExp.test(textInput)) {
              const myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");

              const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: textInput,
                redirect: "follow",
              };

              fetch(
                "https://cxl-services.appspot.com/proxy?url=https://texttospeech.googleapis.com/v1beta1/text:synthesize&token=03ANYolquf_efs0-vgXjklkw2xrTL5osvzLZz3WBnXKWr6aZlSPtqNymu-0xRzreSsDOhU20MaC5jJ56QyUxQ2-jGgHQO5oBG2JL0izwQb6FAEYF_jFuBDPhDjOu4uWHSSCeh1V6Eer35Yf7QglJ9TT2bbhLweUlN3M5jdg2hrPqTBNNAa28qGe6O7vKKje08VUVloNnc5oRqx1EAgooWaVFsNOUo0EFIVd4ADUNlIp54KU6rDL2VEeswuw07SZgZCjJugcbxseDNU-89knsc5uSy_rtYVQal817IybuHIiS-MWxf4Nsfs25XC7slGgffu8HsQgL5B0tGUq1nzuQotUyW19jggUbnAE9t3VwrP8FBR6fyIdyHtMyUo4qvx83TvA-AmpxmxWapHTaEH1NFilnYCjpg_nUiLSq-KbJFOTXCGfC5AsPjp-v4ndTwTqAGnFWzNWfnwy4Rjr6BqpBp4h5GamPQqcE_vr4-kXeOAJXByRZDElMzjHli2mqucVtlYadx_Um5Jda3oMv759FZx_pw5N2d7U7cM0A",
                requestOptions
              )
                .then((response) => response.json())
                .then((result) => {
                  setBase64Audio(
                    "data:audio/wav;base64," + result["audioContent"]
                  );
                })
                .catch((error) => setTextInput(error));
            }
          }}
        >
          Ok
        </button>

        <button
          onClick={() => {
            if (base64Audio !== "") {
              const a = document.getElementById("tts_audio_json");
              let currentTime = new Date()
                .toLocaleString()
                .replace(/[/:]/g, "");
              currentTime = currentTime.replace(" ", "");
              const audioUrl = a.src;
              const audioName = `${currentTime}.wav`;
              saveAs(audioUrl, audioName);
            } else {
              alert("Chưa có Audio để tải về");
            }
          }}
        >
          Download Audio
        </button>

        <button
          onClick={() => {
            navigator.clipboard.readText().then((clipboardText) => {
              setTextInput(clipboardText);
            });
          }}
        >
          Paste
        </button>

        <button onClick={() => setTextInput("")}>Delete</button>

        <button
          onClick={() =>
            window.open(
              "https://www.gstatic.com/cloud-site-ux/text_to_speech/text_to_speech.min.html"
            )
          }
        >
          Web TTS
        </button>

        <button onClick={() => navigate("/tts_us")}>TTS US</button>
        <button onClick={() => navigate("/home")}>Home</button>
      </div>

      <audio
        id="tts_audio_json"
        controls
        autoPlay
        src={base64Audio !== "" ? base64Audio : ""}
      ></audio>
    </div>
  );
}

export default Base64ToAudio;
