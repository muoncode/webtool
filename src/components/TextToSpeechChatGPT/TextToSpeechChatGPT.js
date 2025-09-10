import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { saveAs } from "file-saver";
import axios from "axios";
import { Buffer } from 'buffer';

import "./TextToSpeechChatGPT.css";

function TextToSpeechChatGPT() {

    const navigate = useNavigate();

    const [textInput, setTextInput] = useState("");
    const [textNote, setTextNote] = useState();
    const [base64Audio, setBase64Audio] = useState("");
    const [speed, setSpeed] = useState(1);
    // const [languageCode, setLanguageCode] = useState("vi-VN");
    const [voiceName, setVoiceName] = useState("Charon");
    const [count_character, setCount_character] = useState(0);
    const [pitch, setPitch] = useState(0);
    const [api_key, setAPI_Key] = useState("AIzaSyBdXcs9-IhKV2wZe4m4MpuQ3IJN-kYQ4Vs");
    const [model__TTS, setModel__TTS] = useState("gemini-2.5-flash-preview-tts");

    const get___dstv = () => {

        alert("Chưa CODE");
        // end method get___dstv
    };


    // Hàm tạo header WAV
    const createWavHeader = (dataLength, options) => {
        const { numChannels, sampleRate, bitsPerSample } = options;
        const byteRate = sampleRate * numChannels * bitsPerSample / 8;
        const blockAlign = numChannels * bitsPerSample / 8;
        const buffer = Buffer.alloc(44);

        buffer.write('RIFF', 0);                      // ChunkID
        buffer.writeUInt32LE(36 + dataLength, 4);     // ChunkSize
        buffer.write('WAVE', 8);                      // Format
        buffer.write('fmt ', 12);                     // Subchunk1ID
        buffer.writeUInt32LE(16, 16);                 // Subchunk1Size (PCM)
        buffer.writeUInt16LE(1, 20);                  // AudioFormat (1 = PCM)
        buffer.writeUInt16LE(numChannels, 22);        // NumChannels
        buffer.writeUInt32LE(sampleRate, 24);         // SampleRate
        buffer.writeUInt32LE(byteRate, 28);           // ByteRate
        buffer.writeUInt16LE(blockAlign, 32);         // BlockAlign
        buffer.writeUInt16LE(bitsPerSample, 34);      // BitsPerSample
        buffer.write('data', 36);                     // Subchunk2ID
        buffer.writeUInt32LE(dataLength, 40);         // Subchunk2Size

        return buffer;
    };

    // Chuyển đổi L16 sang WAV
    const convertToWav = (base64Data) => {
        const options = { numChannels: 1, sampleRate: 24000, bitsPerSample: 16 };
        const dataBuffer = Buffer.from(base64Data, 'base64');
        const wavHeader = createWavHeader(dataBuffer.length, options);
        const wavBuffer = Buffer.concat([wavHeader, dataBuffer]);
        return wavBuffer.toString('base64');
    };

    const tts_axios = () => {

        const apiKey = api_key;
        const model = model__TTS;
        const api = 'streamGenerateContent';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:${api}?key=${apiKey}`;

        const payload = {
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: textInput,
                        },
                    ],
                },
            ],
            generationConfig: {
                responseModalities: ['audio'],
                temperature: 1,
                speech_config: {
                    voice_config: {
                        prebuiltVoiceConfig: {
                            voice_name: voiceName,
                        },
                    },
                },
            },
        };

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: payload,
        };



        axios(url, options)
            .then(response => {
                // const res = response.data;
                const chunks = response.data;


                for (const chunk of chunks) {
                    if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {

                        const { mimeType, data } = chunk.candidates[0].content.parts[0].inlineData;
                        // const fileUrl = await saveToDrive(fileName, mimeType, data);
                        setBase64Audio("data:audio/wav;base64," + convertToWav(data));
                    }
                }

            })
            .catch(error => {
                if (textInput !== "") {
                    navigator.clipboard.writeText(textInput);
                }
                setTextInput(error + "\n\nGặp lỗi nên không thể Chuyển văn bản sang Giọng Nói");
            });
        // end function tts_axios
    };

    return (
        <div className="container">
            <textarea
                rows={"37"}
                cols={"90"}
                placeholder={"Nhập vào đây Để nghe thử nha"}
                value={textInput}
                onChange={(e) => {
                    setTextInput(e.target.value);
                    setCount_character(e.target.value.length);
                }}
            ></textarea>

            <div className="btnGroupUS">
                <input
                    placeholder="Model TTS"
                    type={"text"}
                    onChange={(e) => {
                        const value = e.target.value;
                        setModel__TTS(value);
                    }}
                    value={model__TTS}
                />

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
                    placeholder="API Key"
                    type={"password"}
                    onChange={(e) => {
                        const value = e.target.value;
                        // setLanguageCode(value);
                        setAPI_Key(value);
                    }}
                    value={api_key}
                    onCopy={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    style={{ userSelect: 'none' }}
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

                <button onClick={() => {
                    const a = prompt("Input :");
                    const b = prompt("Replace :");

                    setTextInput(textInput.replaceAll(a, b));
                }}> replace </button>

                <button onClick={() => {
                    navigator.clipboard.writeText(textInput);
                    setTextInput("Đã COPY rồi ... nha!");
                }} >Copy</button>

                <button
                    onClick={() => {

                        tts_axios();
                        // const regExp = /[a-zA-Z]/g;

                        // if (regExp.test(textInput)) {

                        // }
                    }}
                >
                    Gemini
                </button>

                <button
                    onClick={() => {
                        if (base64Audio !== "") {
                            const a = document.getElementById("tts_audio");
                            let currentTime = new Date()
                                .toLocaleString()
                                .replace(/[/:]/g, "");
                            currentTime = currentTime.replace(" ", "");
                            const audioUrl = a.src;
                            const audioName = `${currentTime}.wav`;
                            saveAs(audioUrl, audioName);
                        } else {
                            alert("Chưa có Audio để tải về");
                        }
                    }}
                >
                    Download Audio
                </button>

                <button
                    onClick={() => {
                        navigator.clipboard.readText().then((clipboardText) => {
                            setTextInput(clipboardText);
                            setCount_character(clipboardText.length);
                        });
                    }}
                >
                    Paste
                </button>

                <button onClick={() => navigate("/home")}>Home</button>

                <button
                    id="count_character"
                    onClick={() => {
                        setTextInput("");
                        setCount_character(0);
                    }}
                >
                    {count_character}
                </button>

                <button onClick={() => get___dstv()}>Get Subtitle</button>

                <textarea
                    rows={"6"}
                    cols={"6"}
                    value={textNote}
                    onChange={(e) => {
                        setTextNote(e.target.value);
                    }}
                ></textarea>
            </div>

            <audio
                id="tts_audio"
                controls
                autoPlay
                src={base64Audio !== "" ? base64Audio : ""}
            ></audio>
        </div>
    );
}

export default TextToSpeechChatGPT;