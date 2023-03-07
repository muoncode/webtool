import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Base64ToAudio from "./components/Base64ToAudio/Base64ToAudio";
import Test from "./components/Test/Test";
import Base64ToAudioUS from "./components/Base64ToAudioUS/Base64ToAudioUS";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>This is Index</h1>,
    errorElement: <h1>Đang lỗi rồi nha anh em ơi</h1>,
  },
  {
    path: "webtool1/",
    element: <Test />,
    children: [
      {
        path: "",
        element: <h1> Đây là Page số 1 </h1>,
      },
      {
        path: "b/",
        element: <h1> Đây là Page số 2 </h1>,
      },
      {
        path: "c/",
        element: <h1> Đây là Page số 3 </h1>,
      },
    ],
  },
  {
    path: "webtool/",
    element: <App />,
  },
  {
    path: "tts_json/",
    element: <Base64ToAudio />,
  },
  {
    path: "tts_us/",
    element: <Base64ToAudioUS />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
