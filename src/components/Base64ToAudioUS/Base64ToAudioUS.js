import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveAs } from "file-saver";
import axios from "axios";

import "./Base64ToAudioUS.css";

function Base64ToAudioUS() {

  const navigate = useNavigate();

  const [textInput, setTextInput] = useState("");
  const [textNote, setTextNote] = useState(
    `vi-VN-Neural2-A\nvi-VN-Wavenet-C\nen-US-Journey-F\nen-US-Polyglot-1\nen-US-Neural2-A\nen-US-Studio-O\nen-AU-Journey-F\nen-AU-Polyglot-1\nen-AU-Neural2-A`
  );
  const [base64Audio, setBase64Audio] = useState("");
  const [speed, setSpeed] = useState(1);
  const [languageCode, setLanguageCode] = useState("vi-VN");
  const [voiceName, setVoiceName] = useState("vi-VN-Neural2-D");
  const [count_character, setCount_character] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [message, setMessage] = useState("");

  const thong__bao = (text) => {
    setMessage(text);
    setTimeout(() => {
      setMessage("");
    }, 1000);
  };

  const tts_axios = () => {
    const data = JSON.stringify({
      audioConfig: {
        audioEncoding: "LINEAR16",
        effectsProfileId: ["small-bluetooth-speaker-class-device"],
        pitch: pitch,
        speakingRate: speed,
      },
      input: {
        text: textInput.toLowerCase(),
      },
      voice: {
        languageCode: languageCode,
        name: voiceName,
      },
    });

    const config = {
      method: "post",
      url: "https://cxl-services.appspot.com/proxy?url=https://texttospeech.googleapis.com/v1beta1/text:synthesize&token=03ANYolquf_efs0-vgXjklkw2xrTL5osvzLZz3WBnXKWr6aZlSPtqNymu-0xRzreSsDOhU20MaC5jJ56QyUxQ2-jGgHQO5oBG2JL0izwQb6FAEYF_jFuBDPhDjOu4uWHSSCeh1V6Eer35Yf7QglJ9TT2bbhLweUlN3M5jdg2hrPqTBNNAa28qGe6O7vKKje08VUVloNnc5oRqx1EAgooWaVFsNOUo0EFIVd4ADUNlIp54KU6rDL2VEeswuw07SZgZCjJugcbxseDNU-89knsc5uSy_rtYVQal817IybuHIiS-MWxf4Nsfs25XC7slGgffu8HsQgL5B0tGUq1nzuQotUyW19jggUbnAE9t3VwrP8FBR6fyIdyHtMyUo4qvx83TvA-AmpxmxWapHTaEH1NFilnYCjpg_nUiLSq-KbJFOTXCGfC5AsPjp-v4ndTwTqAGnFWzNWfnwy4Rjr6BqpBp4h5GamPQqcE_vr4-kXeOAJXByRZDElMzjHli2mqucVtlYadx_Um5Jda3oMv759FZx_pw5N2d7U7cM0A",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // const res = JSON.stringify(response.data);
        const res = response.data;

        // console.log(res);
        // console.log(res["audioContent"]);
        setBase64Audio("data:audio/wav;base64," + res["audioContent"]);
      })
      .catch(function (error) {
        if (textInput !== "") {
          navigator.clipboard.writeText(textInput);
        }
        setTextInput(error + "\n\nGặp lỗi nên không thể Chuyển văn bản sang Giọng Nói");
      });
  };

  return (
    <div className="container">
      <textarea
      className="tts_us"
        rows={"37"}
        cols={"90"}
        placeholder={"Nhập vào đây Để nghe thử nha"}
        value={textInput}
        onChange={(e) => {
          setTextInput(e.target.value);
          setCount_character(e.target.value.length);
        }}

        onSelect={(e) => {
          // const start = e.target.selectionStart;
          // const end = e.target.selectionEnd;
          // const selectedText = e.target.value.substring(start, end);
          // thong__bao("thu_xem");
          // setCount_character(selectedText.length);
        }}
      ></textarea>

      <div className="btnGroupUS">
        <input
          placeholder="Pitch"
          type={"text"}
          onChange={(e) => {
            const value = e.target.value;
            setPitch(value);
          }}
          value={pitch}
        />

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
            const match = value.match(/^([a-z]{2}-[A-Z]{2})/);
            const result = match ? match[1] : null;
            setVoiceName(value);
            if (languageCode !== result) {
              setLanguageCode(result);
            }
          }}
          value={voiceName}
        />

        <button onClick={() => {
          const a = prompt("Input :");
          const b = prompt("Replace :");

          setTextInput(textInput.replaceAll(a, b));
        }}> replace </button>

        <button onClick={() => {
          navigator.clipboard.writeText(textInput);
          thong__bao("đã COPY rồi ... nha !");
        }} >Copy</button>

        <button
          onClick={() => {
            const regExp = /[a-zA-Z]/g;

            if (regExp.test(textInput)) {
              // const myHeaders = new Headers();
              // myHeaders.append("Content-Type", "application/json");

              // const raw = JSON.stringify({
              //   audioConfig: {
              //     audioEncoding: "LINEAR16",
              //     effectsProfileId: ["small-bluetooth-speaker-class-device"],
              //     pitch: 0,
              //     speakingRate: speed,
              //   },
              //   input: {
              //     text: textInput,
              //   },
              //   voice: {
              //     languageCode: languageCode,
              //     name: voiceName,
              //   },
              // });

              // const requestOptions = {
              //   method: "POST",
              //   headers: myHeaders,
              //   body: raw,
              //   redirect: "follow",
              // };

              // fetch(
              //   "https://cxl-services.appspot.com/proxy?url=https://texttospeech.googleapis.com/v1beta1/text:synthesize&token=03ANYolquf_efs0-vgXjklkw2xrTL5osvzLZz3WBnXKWr6aZlSPtqNymu-0xRzreSsDOhU20MaC5jJ56QyUxQ2-jGgHQO5oBG2JL0izwQb6FAEYF_jFuBDPhDjOu4uWHSSCeh1V6Eer35Yf7QglJ9TT2bbhLweUlN3M5jdg2hrPqTBNNAa28qGe6O7vKKje08VUVloNnc5oRqx1EAgooWaVFsNOUo0EFIVd4ADUNlIp54KU6rDL2VEeswuw07SZgZCjJugcbxseDNU-89knsc5uSy_rtYVQal817IybuHIiS-MWxf4Nsfs25XC7slGgffu8HsQgL5B0tGUq1nzuQotUyW19jggUbnAE9t3VwrP8FBR6fyIdyHtMyUo4qvx83TvA-AmpxmxWapHTaEH1NFilnYCjpg_nUiLSq-KbJFOTXCGfC5AsPjp-v4ndTwTqAGnFWzNWfnwy4Rjr6BqpBp4h5GamPQqcE_vr4-kXeOAJXByRZDElMzjHli2mqucVtlYadx_Um5Jda3oMv759FZx_pw5N2d7U7cM0A",
              //   requestOptions
              // )
              //   .then((response) => response.json())
              //   .then((result) => {
              // setBase64Audio(
              //   "data:audio/wav;base64," + result["audioContent"]
              // );
              //   })
              //   .catch((error) => setTextInput(error));
              tts_axios();
            }
          }}
        >
          Ok
        </button>

        <button
          onClick={() => {
            if (base64Audio !== "") {
              const a = document.getElementById("tts_audio");
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
              setCount_character(clipboardText.length);
            });
          }}
        >
          Paste
        </button>

        <button
          id="count_character"
          onClick={() => {
            setTextInput("");
            setCount_character(0);
          }}
        >
          {count_character}
        </button>

        <button
          onClick={() =>
            window.open(
              "https://www.gstatic.com/cloud-site-ux/text_to_speech/text_to_speech.min.html"
            )
          }
        >
          Web TTS
        </button>

        <button onClick={() => navigate("/webtool")}>Home</button>

        <textarea
        className="text__note"
          rows={"6"}
          cols={"6"}
          value={textNote}
          onChange={(e) => {
            setTextNote(e.target.value);
          }}
        ></textarea>
      </div>

      <audio
        id="tts_audio"
        controls
        autoPlay
        src={base64Audio !== "" ? base64Audio : ""}
      ></audio>

      <span className="messageText">{message}</span>
    </div>
  );
}

export default Base64ToAudioUS;
