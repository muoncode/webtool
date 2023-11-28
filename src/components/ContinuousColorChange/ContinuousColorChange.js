// import { useEffect, useState } from "react";

// import "./ContinuousColorChange.css";

// function ContinuousColorChange() {
//   const [color, setColor] = useState("");

//   const [colorRed, setColorRed] = useState(0);
//   const [colorGreen, setColorGreen] = useState(0);
//   const [colorBlue, setColorBlue] = useState(0);

//   const [colorAlpha, setColorAlpha] = useState(0);
//   const [colorRed22, setColorRed22] = useState(0);
//   const [colorBlue22, setColorBlue22] = useState(0);

//   useEffect(() => {
//     const slide = document.querySelector(".musicTime");
//     slide.value = 700;

//     setInterval(() => {
//       setColor(getRandomColor());

//       setColorRed(Math.floor(Math.random() * 255));
//       setColorGreen(Math.floor(Math.random() * 255));
//       setColorBlue(Math.floor(Math.random() * 255));

//       setColorAlpha(Math.floor(Math.random() * 255));
//       setColorRed22(Math.floor(Math.random() * 255));
//       setColorBlue22(Math.floor(Math.random() * 255));
//     }, 4000);

//     // setInterval(() => {
//     //   if (slide.value === 999) {
//     //     slide.value = 0;
//     //   }
//     //   slide.value = Number(Number(slide.value) + 1);
//     //   console.log(slide.value);
//     // }, 1000);
//   }, []);

//   const getRandomColor = () => {
//     const color_code = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += color_code[Math.floor(Math.random() * 16)];
//     }

//     return color;
//   };

//   return (
//     // <div style={{ backgroundColor: color }} className="ContinuousColorChange">
//     //   <span>This is a Text</span>
//     // </div>
//     <div
//       className="musicContainer"
//       style={{
//         background:
//           "radial-gradient(circle, rgba(" +
//           colorRed +
//           "," +
//           colorGreen +
//           "," +
//           colorBlue +
//           ",1) 0%, rgba(" +
//           colorRed22 +
//           "," +
//           colorAlpha +
//           "," +
//           colorBlue22 +
//           ",1) 100%)",
//       }}
//     >
//       <div className="musicPlayer">
//         <div className="imgCover">
//           <span></span>
//         </div>

//         <div className="mediaControl">
//           <div>
//             <input
//               type="range"
//               className="musicTime"
//               min={0}
//               max={999}
//               step={1}
//               // value={500}
//               style={{ accentColor: color }}
//             />
//           </div>

//           <div className="iconControls">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               height="6vh"
//               viewBox="0 0 512 512"
//             >
//               <path d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z" />
//             </svg>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               height="6vh"
//               viewBox="0 0 320 512"
//             >
//               <path d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z" />
//             </svg>

//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               height="6vh"
//               viewBox="0 0 512 512"
//             >
//               <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm224-72V328c0 13.3-10.7 24-24 24s-24-10.7-24-24V184c0-13.3 10.7-24 24-24s24 10.7 24 24zm112 0V328c0 13.3-10.7 24-24 24s-24-10.7-24-24V184c0-13.3 10.7-24 24-24s24 10.7 24 24z" />
//             </svg>

//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               height="6vh"
//               viewBox="0 0 320 512"
//             >
//               <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z" />
//             </svg>

//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               height="6vh"
//               viewBox="0 0 512 512"
//             >
//               <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z" />
//             </svg>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ContinuousColorChange;

function ContinuousColorChange() {
  return;
}

export default ContinuousColorChange;