import { useEffect, useState } from "react";

import "./ContinuousColorChange.css";

function ContinuousColorChange() {
  const [color, setColor] = useState("");

  useEffect(() => {
    setInterval(() => {
      setColor(getRandomColor());
    }, 10000);
  }, []);

  const getRandomColor = () => {
    const color_code = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += color_code[Math.floor(Math.random() * 16)];
    }

    return color;
  };

  return (
    <div style={{ backgroundColor: color }} className="ContinuousColorChange">
      <span>This is a Text</span>
    </div>
  );
}

export default ContinuousColorChange;
