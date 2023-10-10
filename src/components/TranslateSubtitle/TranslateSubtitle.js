import { useNavigate } from "react-router-dom";
import { useState } from "react";
import srtParser2 from "srt-parser-2";
// import axios from "axios";

import "./TranslateSubtitle.css";

export default function TranslateSubtitle() {
  const navigate = useNavigate();
  // const [subtitles, setSubtitles] = useState([]);
  const [file, setFile] = useState();
  const [textInput, setTextInput] = useState("");
  //   const [comments, setComments] = useState([]);
  const [isTextarea, setIsTextarea] = useState(true);
  //   const [isComments, setIsComments] = useState(false);

  const getFile = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const get_SUb_title = () => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      const fileContent = e.target.result;
      const parser = new srtParser2();
      const srt_array = parser.fromSrt(fileContent);
      let subtitles = "";
      for (let index = 0; index < srt_array.length; index++) {
        subtitles += srt_array[index]["text"] + " ";
      }
      setTextInput(subtitles);
    };
  };

  return (
    <div>
      <div className="container_get_text_translate">
        {isTextarea ? (
          <textarea
            rows={"30"}
            cols={"60"}
            placeholder={"Tiêu đề"}
            value={textInput}
            onChange={(e) => {
              setTextInput(e.target.value);
            }}
          ></textarea>
        ) : null}

        <div className="btnGroup">
          <button
            onClick={() => {
              // const a = textInput.split("\n");
              // const b = [];

              // for (let index = 0; index < a.length; index++) {
              //   if (a[index].charAt(0) === '"') {
              //     a[index] = a[index].replace('"', "");
              //   }
              //   if (a[index].endsWith('"')) {
              //     a[index] = a[index].slice(0, -1);
              //   }

              //   a[index] = a[index].replace(' "', "");
              //   const texts = a[index].split(":");
              //   if (texts[1] !== undefined && texts[1].charAt(0) === ' "') {
              //     texts[1] = texts[1].replace(' "', "");
              //   }

              //   b.push({ id: index, text1: texts[0], text2: texts[1] });
              // }

              //   setComments(b);
              // setIsTextarea(false);
              //   setIsComments(true);
              get_SUb_title();
            }}
          >
            Ok
          </button>

          <button
            onClick={() => {
              //   setIsComments(false);
              setIsTextarea(true);
            }}
          >
            Show Input
          </button>

          <button onClick={() => navigator.clipboard.writeText(textInput)}>
            Copy
          </button>
          <button onClick={() => navigate("/home")}>Home</button>
          <input type="file" onChange={getFile} />
        </div>
      </div>
    </div>
  );
}
