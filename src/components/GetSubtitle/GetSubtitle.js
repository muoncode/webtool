import { useNavigate } from "react-router-dom";
import { useState } from "react";
import srtParser2 from "srt-parser-2";
import axios from "axios";
import { saveAs } from "file-saver";

import "./GetSubtitle.css";

export default function GetSubtitle() {
  const navigate = useNavigate();
  const [subtitle_list, setSubtitle_list] = useState([]);
  const [file, setFile] = useState();
  const [textInput, setTextInput] = useState("");
  //   const [comments, setComments] = useState([]);
  const [isTextarea, setIsTextarea] = useState(true);
  //   const [isComments, setIsComments] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [languageCode, setLanguageCode] = useState("vi-VN");
  const [voiceName, setVoiceName] = useState("vi-VN-Neural2-D");

  const getFile = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const get_SUb_title = () => {
    if (file) {
      alert("Bạn chưa chọn FILE nha!");
      return;
    }
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      const fileContent = e.target.result;
      const parser = new srtParser2();
      const srt_array = parser.fromSrt(fileContent);
      let subtitle = "";
      for (let index = 0; index < srt_array.length; index++) {
        subtitle += srt_array[index]["text"] + " ";
        subtitle_list.push(srt_array[index]["text"]);
      }
      setTextInput(subtitle);
    };
  };

  const text_to_speech_Subtitle = () => {
    if (subtitle_list.length !== 0) {
      for (let index = 0; index < subtitle_list.length; index++) {
        const data = JSON.stringify({
          audioConfig: {
            audioEncoding: "LINEAR16",
            effectsProfileId: ["small-bluetooth-speaker-class-device"],
            pitch: 0,
            speakingRate: speed,
          },
          input: {
            text: subtitle_list[index],
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
            const res = response.data;

            // Giải mã base64 thành binary data
            const binaryData = atob(res["audioContent"]);

            // Chuyển binary data thành mảng các byte
            const byteArray = new Uint8Array(binaryData.length);
            for (let i = 0; i < binaryData.length; i++) {
              byteArray[i] = binaryData.charCodeAt(i);
            }

            // Tạo blob từ mảng byte và thiết lập kiểu MIME
            const blob = new Blob([byteArray], { type: 'audio/wav' });

            // let currentTime = new Date()
            //   .toLocaleString()
            //   .replace(/[/:]/g, "");
            // currentTime = currentTime.replace(" ", "");
            const audioName = `${index}.wav`;
            // Lưu tệp WAV về máy
            saveAs(blob, audioName);
          })
          .catch(function (error) {
            if (textInput !== "") {
              navigator.clipboard.writeText(textInput);
            }
            setTextInput(error);
            setSubtitle_list([]);
          });

        if (index === subtitle_list.length - 1) {
          setSubtitle_list([]);
          setTextInput("Đã chuyển phụ đề thành FILE âm thanh. Xong !");
        }
      };
    } else {
      setTextInput("Chưa có dữ liệu phụ đề");
    }
    // --------------------------------------------------------------
  };

  const text_to_speech_Lines = () => {
    if (textInput.length === 0) {
      alert("Cần nhập văn bản hoặc PHỤ ĐỀ nha!")
      return;
    }
    const line_list = textInput.split("\n");
    for (let index = 0; index < line_list.length; index++) {
      const data = JSON.stringify({
        audioConfig: {
          audioEncoding: "LINEAR16",
          effectsProfileId: ["small-bluetooth-speaker-class-device"],
          pitch: 0,
          speakingRate: speed,
        },
        input: {
          text: line_list[index],
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
          const res = response.data;

          // Giải mã base64 thành binary data
          const binaryData = atob(res["audioContent"]);

          // Chuyển binary data thành mảng các byte
          const byteArray = new Uint8Array(binaryData.length);
          for (let i = 0; i < binaryData.length; i++) {
            byteArray[i] = binaryData.charCodeAt(i);
          }

          // Tạo blob từ mảng byte và thiết lập kiểu MIME
          const blob = new Blob([byteArray], { type: 'audio/wav' });

          // let currentTime = new Date()
          //   .toLocaleString()
          //   .replace(/[/:]/g, "");
          // currentTime = currentTime.replace(" ", "");
          const audioName = `${index}.wav`;
          // Lưu tệp WAV về máy
          saveAs(blob, audioName);
        })
        .catch(function (error) {
          if (textInput !== "") {
            navigator.clipboard.writeText(textInput);
          }
          setTextInput(error);
        });

      if (index === line_list.length - 1) {
        setTextInput("Đã chuyển Từng Dòng thành FILE âm thanh. Xong !");
      }
    };
    // ---------------------------------------------------------------         
  };

  return (
    <div>
      <div className="container_get_text_translate">
        {isTextarea ? (
          <textarea
            rows={"30"}
            cols={"60"}
            placeholder={"Phụ đề"}
            value={textInput}
            onChange={(e) => {
              setTextInput(e.target.value);
            }}
          ></textarea>
        ) : null}

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

          <input type="file" onChange={getFile} />

          <button
            onClick={() => {
              get_SUb_title();
            }}
          >
            Ok
          </button>

          <button onClick={() => {
            const parser = new srtParser2();
            const srt_array = parser.fromSrt(textInput);
            let subtitle = "";
            for (let index = 0; index < srt_array.length; index++) {
              subtitle += srt_array[index]["text"] + " ";
              // subtitle_list.push(srt_array[index]["text"]);
            }
            setTextInput(subtitle);
          }} >Ok Sub</button>

          <button onClick={text_to_speech_Subtitle} > Download Audios </button>
          <button onClick={text_to_speech_Lines} > Download Audio Lines </button>

          <button onClick={() => navigator.clipboard.writeText(textInput)}>
            Copy
          </button>

          <button
            onClick={() => {
              //   setIsComments(false);
              setIsTextarea(true);
            }}
          >
            Show Input
          </button>

          <button onClick={() => navigate("/home")}>Home</button>
        </div>
      </div>
    </div>
  );
}
