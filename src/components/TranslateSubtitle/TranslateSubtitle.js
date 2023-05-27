import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";

import "./TranslateSubtitle.css";

export default function TranslateSubtitle() {
  const navigate = useNavigate();
  const [textInput, setTextInput] = useState("");
  //   const [comments, setComments] = useState([]);
  const [isTextarea, setIsTextarea] = useState(true);
  //   const [isComments, setIsComments] = useState(false);

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
              const a = textInput.split("\n");
              const b = [];

              for (let index = 0; index < a.length; index++) {
                if (a[index].charAt(0) === '"') {
                  a[index] = a[index].replace('"', "");
                }
                if (a[index].endsWith('"')) {
                  a[index] = a[index].slice(0, -1);
                }

                a[index] = a[index].replace(' "', "");
                const texts = a[index].split(":");
                if (texts[1] !== undefined && texts[1].charAt(0) === ' "') {
                  texts[1] = texts[1].replace(' "', "");
                }

                b.push({ id: index, text1: texts[0], text2: texts[1] });
              }

              //   setComments(b);
              setIsTextarea(false);
              //   setIsComments(true);
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

          <button
            onClick={async () => {
              const { Configuration, OpenAIApi } = require("openai");

              const configuration = new Configuration({
                apiKey: "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",
              });
              const openai = new OpenAIApi(configuration);

              const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt:
                  "Translate this into 1. French, 2. Spanish and 3. Japanese:\n\nWhat rooms do you have available?\n\n1.",
                temperature: 0.3,
                max_tokens: 100,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
              });
              setTextInput(response);
            }}
          >
            tool
          </button>

          <button onClick={() => navigate("/home")}>Home</button>
        </div>

        {isTextarea ? (
          <textarea
            rows={"30"}
            cols={"60"}
            placeholder={"Mô tả"}
            value={textInput}
            onChange={(e) => {
              setTextInput(e.target.value);
            }}
          ></textarea>
        ) : null}
      </div>
    </div>
  );
}
