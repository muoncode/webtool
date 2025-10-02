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

                    <button onClick={() => {
                        const a = prompt("Input :");
                        const b = prompt("Replace :");

                        setTextInput(textInput.replaceAll(a, b));
                    }}> replace </button>

                    <button onClick={() => navigate("/home")}>Home</button>

                    <button onClick={() => setTextInput("")}>Delete</button>
                </div>

                {isComments
                    ? <div className="comments_cp_text">
                        {comments.map((e, i) => {
                            if (!e.text || e.text.trim() === '') return null;
                            return (
                                <p
                                    key={i}
                                    className="cmt"
                                    onClick={() => {
                                        navigator.clipboard.writeText(e.text);

                                        setComments(
                                            comments.map((f) => {
                                                if (f.id === i) {
                                                    return {
                                                        ...f,
                                                        text: `Pressed and Copied , Đã nhấn và Sao chép RỒI ... !`,
                                                    };
                                                } else {
                                                    return f;
                                                }
                                            })
                                        );
                                    }}
                                >
                                    {e.text}
                                </p>
                            );
                        })}
                    </div>
                    : null}
                {/* end comment text */}
            </div>
        </div>
    );
}