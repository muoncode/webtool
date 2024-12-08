import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveAs } from "file-saver";
import axios from "axios";

import "./TextToSpeechChatGPT.css";

function TextToSpeechChatGPT() {

    const navigate = useNavigate();

    const [textInput, setTextInput] = useState("");
    const [textNote, setTextNote] = useState(
        `vi-VN-Neural2-A\nvi-VN-Wavenet-C\nen-US-Polyglot-1\nen-US-Neural2-A\nen-US-Studio-M\nen-AU-Journey-F\nen-AU-Polyglot-1\nen-AU-Neural2-A`
    );
    const [base64Audio, setBase64Audio] = useState("");
    const [speed, setSpeed] = useState(1);
    const [languageCode, setLanguageCode] = useState("vi-VN");
    const [voiceName, setVoiceName] = useState("vi-VN-Neural2-D");
    const [count_character, setCount_character] = useState(0);
    const [pitch, setPitch] = useState(0);

    const tts_axios = () => {

        axios.get('https://chatgpt.com/backend-api/synthesize', {
            params: {
                message_id: '0c327a58-5825-4d8c-a002-0dc27b164818',
                conversation_id: '6755b905-fa0c-8012-8784-a24eb7008416',
                voice: 'juniper',
                format: 'aac'
            },
            headers: {
                accept: '*/*',
                'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
                authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJwd2RfYXV0aF90aW1lIjoxNzMyODk5MjM0NTc5LCJzZXNzaW9uX2lkIjoiZi0tWUZfSUlBYkZmcUpxS3YyQ2pMOVlRRVNuUUplUkIiLCJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJpdGFpc3YxOTk5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InBvaWQiOiJvcmctbkdsMDdxMzVzOG50azZIM1Q2eE1tOWdsIiwidXNlcl9pZCI6InVzZXIteUtmSG5GblhPVjltTWNVVGJwMXJrcEthIn0sImlzcyI6Imh0dHBzOi8vYXV0aDAub3BlbmFpLmNvbS8iLCJzdWIiOiJhdXRoMHw2MzlkZDU3Mjc5NDEyOGFmMmVmMWFhMjkiLCJhdWQiOlsiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MSIsImh0dHBzOi8vb3BlbmFpLm9wZW5haS5hdXRoMGFwcC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzMyODk5MjM2LCJleHAiOjE3MzM3NjMyMzYsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9yZ2FuaXphdGlvbi53cml0ZSBvZmZsaW5lX2FjY2VzcyIsImF6cCI6IlRkSkljYmUxNldvVEh0Tjk1bnl5d2g1RTR5T282SXRHIn0.N0q8nJlS5KtTelWBUqipARE2ql7p8LQAqFw3n3B_bsOB6bN3BIf80sUG8HdbjZfMPhjkBn1VkL47evMX9yrY34nSwT4BKRqPTEm0OkzG4POeyUc1L7YBg-yOA52pqMYIPwJz_vdsMdf75tizqmtZZgvz5eLPSE2NHVPgz0YZMqE1JI87_SPCnPh20OB20FxN14ambz29SDIHtyHT86lJUq_udgzJwrl9NjE3ovKkOOwXy5DvxZsxAnRWh76lG6ST-jvxzy4allNVZAjYyfyRciCCOrWGC-GhdWqltMMcpJZqbCLIeG5VogXAfLQa2MqPyD-ToGd5eKEmG_WqkvgCUA',
                'oai-device-id': '674763cc-0bf5-4d19-a393-a01785fe9137',
                'oai-language': 'vi-VN',
                priority: 'u=1, i',
                'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                'sec-ch-ua-arch': '"x86"',
                'sec-ch-ua-bitness': '"64"',
                'sec-ch-ua-full-version': '"131.0.6778.109"',
                'sec-ch-ua-full-version-list': '"Google Chrome";v="131.0.6778.109", "Chromium";v="131.0.6778.109", "Not_A Brand";v="24.0.0.0"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-model': '""',
                'sec-ch-ua-platform': '"Windows"',
                'sec-ch-ua-platform-version': '"10.0.0"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin'
            }
        })
            .then(response => {
                const res = response.data;
                console.log(response);
                // setBase64Audio("data:audio/wav;base64," + res["audioContent"]);
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
                    placeholder="Pitch"
                    type={"text"}
                    onChange={(e) => {
                        const value = e.target.value;
                        setPitch(value);
                    }}
                    value={pitch}
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
                    placeholder="LanguageCode"
                    type={"text"}
                    onChange={(e) => {
                        const value = e.target.value;
                        setLanguageCode(value);
                    }}
                    value={languageCode}
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
                        const regExp = /[a-zA-Z]/g;

                        if (regExp.test(textInput)) {
                            // const myHeaders = new Headers();
                            // myHeaders.append("Content-Type", "application/json");

                            // const raw = JSON.stringify({
                            //   audioConfig: {
                            //     audioEncoding: "LINEAR16",
                            //     effectsProfileId: ["small-bluetooth-speaker-class-device"],
                            //     pitch: 0,
                            //     speakingRate: speed,
                            //   },
                            //   input: {
                            //     text: textInput,
                            //   },
                            //   voice: {
                            //     languageCode: languageCode,
                            //     name: voiceName,
                            //   },
                            // });

                            // const requestOptions = {
                            //   method: "POST",
                            //   headers: myHeaders,
                            //   body: raw,
                            //   redirect: "follow",
                            // };

                            // fetch(
                            //   "https://cxl-services.appspot.com/proxy?url=https://texttospeech.googleapis.com/v1beta1/text:synthesize&token=03ANYolquf_efs0-vgXjklkw2xrTL5osvzLZz3WBnXKWr6aZlSPtqNymu-0xRzreSsDOhU20MaC5jJ56QyUxQ2-jGgHQO5oBG2JL0izwQb6FAEYF_jFuBDPhDjOu4uWHSSCeh1V6Eer35Yf7QglJ9TT2bbhLweUlN3M5jdg2hrPqTBNNAa28qGe6O7vKKje08VUVloNnc5oRqx1EAgooWaVFsNOUo0EFIVd4ADUNlIp54KU6rDL2VEeswuw07SZgZCjJugcbxseDNU-89knsc5uSy_rtYVQal817IybuHIiS-MWxf4Nsfs25XC7slGgffu8HsQgL5B0tGUq1nzuQotUyW19jggUbnAE9t3VwrP8FBR6fyIdyHtMyUo4qvx83TvA-AmpxmxWapHTaEH1NFilnYCjpg_nUiLSq-KbJFOTXCGfC5AsPjp-v4ndTwTqAGnFWzNWfnwy4Rjr6BqpBp4h5GamPQqcE_vr4-kXeOAJXByRZDElMzjHli2mqucVtlYadx_Um5Jda3oMv759FZx_pw5N2d7U7cM0A",
                            //   requestOptions
                            // )
                            //   .then((response) => response.json())
                            //   .then((result) => {
                            // setBase64Audio(
                            //   "data:audio/wav;base64," + result["audioContent"]
                            // );
                            //   })
                            //   .catch((error) => setTextInput(error));
                            tts_axios();
                        }
                    }}
                >
                    ChatGPT
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

                <button
                    onClick={() =>
                        window.open(
                            "https://www.gstatic.com/cloud-site-ux/text_to_speech/text_to_speech.min.html"
                        )
                    }
                >
                    Web TTS
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
