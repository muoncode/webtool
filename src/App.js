import {useNavigate} from "react-router-dom";
import {useState} from "react";

import "./App.css";

function App() {
    const navigate = useNavigate();
    const [textInput, setTextInput] = useState("");
    const [kq, setKQ] = useState("");
    const [idService, setIdService] = useState(4);
    const [message, setMessage] = useState("");

    const thong__bao = (text) => {
        setMessage(text);
        setTimeout(() => {
            setMessage("");
        }, 1000);
    };

    const handleString = (text) => {
        const idSelect = Number(idService);
        if (text !== "") {
            if (idSelect === 1) {
                const a = prompt("Input :");
                const b = prompt("Replace :");

                text = text.replaceAll(a, b);
                setKQ(text);
            } else if (idSelect === 0) {
                const a = text.split("\n");
                let b = "";
                for (let index = 0; index < a.length; index++) {
                    b += a[index] + ",\n";
                }
                setKQ(b);
            } else if (idSelect === 2) {
                const a = text.split("\n");
                let b = "";
                const c = prompt("Characters :");
                for (let index = 0; index < a.length; index++) {
                    b += a[index] + c + "\n";
                }
                setKQ(b);
            } else if (idSelect === 3) {
                const a = text.split("\n");
                let b = "";
                for (let index = 0; index < a.length; index++) {
                    b += a[index] + " ";
                }
                setKQ(b);
            } else if (idSelect === 4) {
                const a = text.split("\n");
                let b = "";
                for (let index = 0; index < a.length; index++) {
                    b += a[index].toLowerCase() + ",\n";
                }
                setKQ(b);
            } else if (idSelect === 5) {
                const a = text.split("\n");
                let b = "";
                for (let index = 0; index < a.length; index++) {
                    b += a[index].toLowerCase() + "\n";
                }
                setKQ(b);
            } else if (idSelect === 6) {
                // Lấy đoạn thời gian
                let c = "";

                text = text.replaceAll("  -  ES_", " ");

                const d = text.split("\n");
                for (let index = 0; index < d.length; index++) {
                    c += d[index].split(" - ")[0] + "\n";
                }

                c = c.replaceAll("(Guitar Version)", "");

                setKQ(c);
            } else if (idSelect === 7) {
                // Lấy bình luận Facebook
                // Tạo một đối tượng DOM từ đoạn mã HTML
                const parser = new DOMParser();
                const htmlDoc = parser.parseFromString(text, "text/html");

                // Trích xuất danh sách các phần tử li
                const listItems = htmlDoc.querySelectorAll("ul li");
                const initialArray = [];

                // Duyệt qua từng phần tử li và trích xuất văn bản
                listItems.forEach(function (item, index) {
                    if (
                        item.querySelectorAll('div[dir="auto"][style="text-align: start;"]')
                            .length
                    ) {
                        const a = item.querySelectorAll(
                            'div[dir="auto"][style="text-align: start;"]'
                        );

                        a.forEach(function (divElement) {
                            if (divElement.querySelector("span")) {
                                const childNodes = divElement.childNodes;
                                // Duyệt qua danh sách các nút con và in ra nội dung
                                for (let i = 0; i < childNodes.length; i++) {
                                    if (childNodes[i].nodeType === Node.ELEMENT_NODE) {
                                        // console.log('Element Node:', childNodes[i]);
                                    } else if (childNodes[i].nodeType === Node.TEXT_NODE) {
                                        // console.log('Text Node:', childNodes[i].textContent);
                                        initialArray.push(childNodes[i].textContent);
                                    }
                                }
                            } else {
                                const textContent = divElement.textContent;

                                // console.log(textContent + " ==================================== ");
                                initialArray.push(textContent);
                            }
                        });
                    }
                });

                // Sử dụng Set để loại bỏ các phần tử trùng lặp
                const uniqueSet = new Set(initialArray);

                // Chuyển Set thành một mảng
                const uniqueArray = Array.from(uniqueSet);

                // uniqueArray bây giờ chứa các phần tử không trùng lặp
                let comment = "";
                uniqueArray.forEach(function (divElement, index) {
                    comment += divElement + "\n";
                });
                setKQ(comment);
            } else if (idSelect === 8) {
                const a = text.split("\n");
                let b = "";
                for (let index = 0; index < a.length; index++) {
                    b += a[index].toUpperCase() + "\n";
                }
                setKQ(b);
            } else if (idSelect === 9) {
                let nameFile = text;
                nameFile = nameFile.replaceAll("_", "");
                nameFile = nameFile.replaceAll("(", "");
                nameFile = nameFile.replaceAll(")", "");
                nameFile = nameFile.replaceAll(" ", "");
                nameFile = nameFile.replaceAll("-", "");
                setKQ(nameFile);
            } else if (idSelect === 10) {
                // Loại bỏ các Hashtag giống nhau
                const uniqueString = [...new Set(text.split(' '))].join(' ');
                setKQ(uniqueString);
                thong__bao("Đã xóa các Hashtag trùng lặp");
            } else if (idSelect === 12) {
                const result = text.replace("/shorts/", "/watch?v=");
                setKQ(result);
                thong__bao("Đã copy XONG ... !");
                navigator.clipboard.writeText(result);
                setTextInput("");
                return;
            }
            // option features


        } else {
            setKQ("Bạn phải nhập nhé !");
        }
    };

    return (
        <div className="container">
      <textarea
          rows={"30"}
          cols={"60"}
          placeholder={"Nhập vào đây nha"}
          value={textInput}
          onChange={(e) => {
              const text = e.target.value;
              setTextInput(text);
              try {
                  handleString(text);
              } catch (error) {
                  setKQ(error);
              }
          }}
      ></textarea>

            <div className="btnGroup">
                <select
                    value={idService}
                    onChange={(e) => {
                        if (e.target.value === 11) {
                            return;
                        }
                        setIdService(e.target.value);
                    }}
                >
                    <option value={0}>Add Characters</option>
                    <option value={1}>Replace</option>
                    <option value={2}>Add at End</option>
                    <option value={3}>Delete Newline</option>
                    <option value={4}>To Lowercase</option>
                    <option value={5}>Lowercase Edit</option>
                    <option value={6}>Music Comment</option>
                    <option value={7}>Get Comment</option>
                    <option value={8}>ToUpperCase</option>
                    <option value={9}>Epidemicsound</option>
                    <option value={10}>same removal</option>
                    <option value={11}>Random Number</option>
                    <option value={12}>Link YT Short</option>
                </select>

                <button onClick={() => {
                    let result = '';
                    for (let i = 0; i < 20; i++) {
                        result += Math.floor(Math.random() * 10); // Random digit from 0 to 9
                    }
                    setKQ(result);
                    thong__bao("Đã tạo và COPY chuỗi số Ngẫu Nhiên ... !");
                    navigator.clipboard.writeText(result);
                }}>Random Number
                </button>

                <button onClick={() => navigate("/tts_us")}>tts</button>

                <button
                    onClick={() => {
                        navigator.clipboard.writeText(kq);
                        thong__bao("Đã copy văn bản");
                    }}
                >
                    Copy
                </button>

                <button
                    onClick={() => {
                        navigator.clipboard.readText().then((clipboardText) => {
                            setTextInput(clipboardText);
                            try {
                                handleString(clipboardText);
                            } catch (error) {
                                setKQ(error);
                            }
                        });
                    }}
                >
                    Paste
                </button>

                <button onClick={() => navigate("/home")}>Menu</button>

                <button onClick={() => setTextInput("")}>Delete</button>
                <span className="messageText">{message}</span>
            </div>

            <textarea
                className="input-text"
                rows={"30"}
                cols={"60"}
                placeholder={"Xem kết quả ở đây"}
                value={kq !== "" ? kq : ""}
                onChange={() => {
                }}
            ></textarea>
        </div>
    );
}

export default App;
