/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./style.scss";
import QuocHocHue from "./quoc_hoc_hue.jpg";

const DrawCanvas = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [clientSize, setClientSize] = useState({
    width: null,
    height: null,
  });
  const [naturalSize, setNaturalSize] = useState({
    width: null,
    height: null,
  });

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setNaturalSize({ width: naturalWidth, height: naturalHeight });
  };

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const img = document.getElementById("imageId123");

    setClientSize({ width: img.clientWidth, height: img.clientHeight });

    if (img) {
      const getCursorPosition = (e) => {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setCoordinates((prev) => {
          console.debug("prev: ", prev);

          if (prev?.some((it) => it.x === x && it.y === y)) {
            return [...prev];
          }
          return [...prev, { x, y }];
        });
      };

      img.addEventListener("click", (e) => {
        getCursorPosition(e);
      });
      return () => {
        img.removeEventListener("click", getCursorPosition);
      };
    }
  }, []);

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";

    // Draw a circle at each point
    coordinates.forEach((it) => {
      ctx.beginPath();
      ctx.arc(it.x, it.y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw lines connecting the points
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.beginPath();
    coordinates.forEach((it, index) => {
      if (index === 0) {
        ctx.moveTo(it.x, it.y);
      } else {
        ctx.lineTo(it.x, it.y);
      }
    });
    ctx.stroke();
  }, [coordinates]);

  return (
    <div className="draw-canvas">
      <div className="draw-canvas_wrap-img">
        <img
          id="imageId123"
          src={QuocHocHue}
          alt="QuocHocHue"
          onLoad={handleImageLoad}
        />
        <canvas
          id="canvasId123"
          className="draw-canvas_wrap-img_canvasEle"
          // width={clientSize.width}
          // height={clientSize.height}
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};

export default DrawCanvas;
