import "./App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function App() {
  const navigate = useNavigate();
  const [textInput, setTextInput] = useState("");
  const [kq, setKQ] = useState("");
  const [idService, setIdService] = useState(0);

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
          b += a[index];
        }
        setKQ(b);
      } else if (idSelect === 4) {
        const a = text.split("\n");
        let b = "";
        for (let index = 0; index < a.length; index++) {
          b += a[index].toLowerCase() + ",\n";
        }
        setKQ(b);
      }
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
          let text = e.target.value;
          setTextInput(text);
          handleString(text);
        }}
      ></textarea>

      <div className="btnGroup">
        <select
          value={idService}
          onChange={(e) => {
            setIdService(e.target.value);
          }}
        >
          <option value={0}>Add Characters</option>
          <option value={1}>Replace</option>
          <option value={2}>Add at End</option>
          <option value={3}>Delete Newline</option>
          <option value={4}>To Lowercase</option>
        </select>

        <button onClick={() => navigate("/tts_json")}>tts</button>
        <button onClick={() => navigator.clipboard.writeText(kq)}>Copy</button>
      </div>

      <textarea
        rows={"30"}
        cols={"60"}
        placeholder={"Xem kết quả ở đây"}
        value={kq !== "" ? kq : ""}
      ></textarea>
    </div>
  );
}

export default App;
