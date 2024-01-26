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
  const [selectedPointIndex, setSelectedPointIndex] = useState(null);

  const randomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const handleImageLoad = (e) => {
    const { clientWidth, clientHeight } = e.target;
    setClientSize({ width: clientWidth, height: clientHeight });
  };

  useEffect(() => {
    const canvas = document.querySelector("canvas");

    const handleCanvasClick = (e) => {
      const canvasTarget = e.target;
      const rect = canvasTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const clickedPointIndex = coordinates.findIndex((point) => {
        const distance = Math.sqrt(
          Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2),
        );
        return distance <= 6;
      });

      if (clickedPointIndex !== -1) {
        setSelectedPointIndex(clickedPointIndex);
      } else {
        setCoordinates((prev) => {
          if (prev?.some((it) => it.x === x && it.y === y)) {
            return [...prev];
          }
          return [...prev, { x, y }];
        });
      }
    };

    const handleMouseMove = (e) => {
      // e.preventDefault();
      e.stopPropagation();
      if (selectedPointIndex != null) {
        const canvasTarget = e.target;
        const rect = canvasTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setCoordinates((prevPoints) =>
          prevPoints.map((point, index) =>
            index === selectedPointIndex ? { x, y } : point,
          ),
        );
      }
    };

    const handleMouseUp = (e) => {
      // e.preventDefault();
      // e.stopPropagation();
      setSelectedPointIndex(null);
    };

    const drawOnCanvas = () => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw a circle at each point
      coordinates.forEach((it) => {
        ctx.beginPath();
        ctx.arc(it.x, it.y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = randomColor();
        ctx.fill();
      });

      // Draw lines connecting the points
      ctx.strokeStyle = randomColor();
      ctx.lineWidth = 2;
      ctx.beginPath();
      coordinates.forEach((it, index) => {
        if (index === 0) {
          ctx.moveTo(it.x, it.y);
        } else {
          ctx.lineTo(it.x, it.y);
        }
      });
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = "#ffffff66";
      ctx.fill();
    };

    drawOnCanvas();

    if (canvas) {
      canvas.addEventListener("click", handleCanvasClick);
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
      return () => {
        canvas.removeEventListener("click", handleCanvasClick);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [coordinates, selectedPointIndex]);

  return (
    <div className="draw-canvas">
      <div className="draw-canvas_wrap-img">
        <img src={QuocHocHue} alt="QuocHocHue" onLoad={handleImageLoad} />
        <canvas
          id="canvasId123"
          className="draw-canvas_wrap-img_canvasEle"
          width={clientSize.width}
          height={clientSize.height}
        />
      </div>
    </div>
  );
};

export default DrawCanvas;
