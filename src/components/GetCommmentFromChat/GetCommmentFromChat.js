import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./GetCommmentFromChat.css";

export default function GetCommmentFromChat() {
  const navigate = useNavigate();
  const [textInput, setTextInput] = useState("");
  const [comments, setComments] = useState([]);
  const [isTextarea, setIsTextarea] = useState(true);
  const [isComments, setIsComments] = useState(false);

  return (
    <div>
      <div className="container_get_cmt">
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

                b.push({ id: index, text: a[index] });
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
                  <p
                    key={i}
                    className="cmt"
                    onClick={() => {
                      navigator.clipboard.writeText(e.text);

                      setComments(
                        comments.map((e) => {
                          if (e.id === i) {
                            return {
                              ...e,
                              text: `Pressed and Copied`,
                            };
                          } else {
                            return e;
                          }
                        })
                      );
                    }}
                  >
                    {e.text}
                  </p>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
