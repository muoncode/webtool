import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

import "./DownloadImageFromURL.css"

function DownloadImageFromURL() {

    const navigate = useNavigate();
    const [textInput, setTextInput] = useState("");
    const [message, setMessage] = useState("");

    const thong__bao = (text) => {
        setMessage(text);
        setTimeout(() => {
            setMessage("");
        }, 1000);
    };

    const download_image = async () => {
        if (textInput.length === 0) {
            alert("nhập URL để tải ảnh nhé!...");
            return;
        }
        try {
            const urls = textInput.split("\n");

            for (let index = 0; index < urls.length; index++) {
                if (urls[index] !== "") {
                    const imageUrl = urls[index];
                    let currentTime = new Date()
                        .toLocaleString()
                        .replace(/[/:]/g, "");
                    currentTime = currentTime.replace(" ", "");
                    const imageName = `${currentTime}.png`;
                    const response = await axios.get(imageUrl, { responseType: 'blob' });
                    const blob = response.data;
                    saveAs(blob, imageName);
                }
            }
            setTextInput(`Image downloaded successfully!`);
        } catch (error) {
            if (textInput !== "") {
                navigator.clipboard.writeText(textInput);
            }
            setTextInput(`Error downloading image: \n${error}`);
        }
    };

    return (
        <div className="container">
            <textarea
                rows={"30"}
                cols={"80"}
                placeholder={"Nhập vào đây ..."}
                value={textInput}
                onChange={(e) => {
                    setTextInput(e.target.value);
                }}
            ></textarea>

            <div className="btnGroup">
                <button onClick={() => {
                    navigator.clipboard.readText().then((url) => {
                        setTextInput(url);

                        if (!url.includes("/reel/")) {
                            thong__bao("URL phải xem lại ĐI ... !");
                            return;
                        };

                        const videoId = url.replace(/\/+$/, "").split("/reel/")[1];
                        navigator.clipboard.writeText(`https://www.facebook.com/watch/?v=${videoId}`);
                        thong__bao("Đã chuyển URL video Facebook vào clipboard!");
                    });
                }} >Facebook URL video</button>
                <button onClick={download_image} >Download</button>
                <button onClick={() => navigate("/home")}>Home</button>
                <button onClick={() => setTextInput("")}>Delete</button>
                <span className="messageText">{message}</span>
            </div>
        </div>
    );
};

export default DownloadImageFromURL;