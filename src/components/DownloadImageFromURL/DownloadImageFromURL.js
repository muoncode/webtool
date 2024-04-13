import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

import "./DownloadImageFromURL.css"

function DownloadImageFromURL() {

    const navigate = useNavigate();
    const [textInput, setTextInput] = useState("");

    const download_image = async () => {
        if (textInput.length === 0) {
            alert("nhập URL để tải ảnh nhé!...");
            return;
        }
        try {
            const urls = textInput.split("\n");
            console.log(urls);
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
            setTextInput(`Error downloading image: ${error}`);
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
                <button onClick={download_image} >Download</button>
                <button onClick={() => navigate("/home")}>Home</button>
            </div>
        </div>
    );
};

export default DownloadImageFromURL;