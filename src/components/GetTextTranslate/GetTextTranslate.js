import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./GetTextTranslate.css";

export default function GetTextTranslate() {
  const navigate = useNavigate();
  const [textInput, setTextInput] = useState("");
  const [comments, setComments] = useState([]);
  const [isTextarea, setIsTextarea] = useState(true);
  const [isComments, setIsComments] = useState(false);

  return (
    <div>
      <div className="container_get_text_translate">
        {isTextarea ? (
          <textarea
            rows={"30"}
            cols={"60"}
            placeholder={"Nhập vào đây nha"}
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

                const texts = a[index].split(":");

                b.push({ id: index, text1: texts[0], text2: texts[1] });
              }

              setComments(b);
              setIsTextarea(false);
              setIsComments(true);
            }}
          >
            Ok
          </button>

          <button
            onClick={() => {
              setIsComments(false);
              setIsTextarea(true);
            }}
          >
            Show Input
          </button>

          <button onClick={() => navigate("/webtool")}>tool</button>

          <button onClick={() => navigate("/home")}>Home</button>
        </div>

        <div className="comments">
          {isComments
            ? comments.map((e, i) => {
                return (
                  <div className="text_translate" key={i}>
                    <p className="name_language">{e.text1}</p>
                    <p
                      className="cmt"
                      onClick={() => {
                        navigator.clipboard.writeText(e.text2);

                        setComments(
                          comments.map((e) => {
                            if (e.id === i) {
                              return {
                                ...e,
                                text2: `Pressed and Copied`,
                              };
                            } else {
                              return e;
                            }
                          })
                        );
                      }}
                    >
                      {e.text2}
                    </p>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
