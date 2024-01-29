/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./style.scss";
import QuocHocHue from "./quoc_hoc_hue.jpg";

const DrawCanvas = () => {
  const radius = 6;
  const [coordinates, setCoordinates] = useState([]);
  const [clientSize, setClientSize] = useState({
    width: null,
    height: null,
  });
  const [selectedPointIndex, setSelectedPointIndex] = useState(null);
  const [selectedPointInside, setSelectedPointInside] = useState(null);
  const [checkPointEvent, setCheckPointEvent] = useState(false);

  const randomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const handleImageLoad = (e) => {
    const { clientWidth, clientHeight } = e.target;
    setClientSize({ width: clientWidth, height: clientHeight });
  };

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    const isPointInsidePolygon = (x, y, vertices) => {
      ctx.beginPath();
      vertices.forEach((it, index) => {
        if (index === 0) {
          ctx.moveTo(it.x, it.y);
        } else {
          ctx.lineTo(it.x, it.y);
        }
      });
      ctx.closePath();
      return ctx.isPointInPath(x, y);
    };

    const handleClickedPointIndex = (x, y) =>
      coordinates.findIndex((point) => {
        const distance = Math.sqrt(
          Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2),
        );
        return distance <= radius;
      });

    const handleCanvasClick = (e) => {
      const canvasTarget = e.target;
      const rect = canvasTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (!isPointInsidePolygon(x, y, coordinates)) {
        setCoordinates((prev) => {
          if (prev?.some((it) => it.x === x && it.y === y)) {
            return [...prev];
          }
          return [...prev, { x, y }];
        });
      }
    };

    const handleCanvasMousedown = (e) => {
      const canvasTarget = e.target;
      const rect = canvasTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (isPointInsidePolygon(x, y, coordinates)) {
        setSelectedPointInside({ x, y });
      } else if (handleClickedPointIndex(x, y) !== -1) {
        setSelectedPointIndex(handleClickedPointIndex(x, y));
      }
    };

    const handleMouseMove = (e) => {
      const canvasTarget = e.target;
      const rect = canvasTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (
        isPointInsidePolygon(x, y, coordinates) ||
        handleClickedPointIndex(x, y) !== -1
      ) {
        setCheckPointEvent(true);
      } else {
        setCheckPointEvent(false);
      }

      if (selectedPointIndex != null) {
        setCoordinates((prevPoints) =>
          prevPoints.map((point, index) =>
            index === selectedPointIndex ? { x, y } : point,
          ),
        );
      }

      if (selectedPointInside != null) {
        const dx = x - selectedPointInside.x;
        const dy = y - selectedPointInside.y;

        setCoordinates((prevPoints) =>
          prevPoints.map((point) => {
            const newX = point?.x + dx;
            const newY = point?.y + dy;

            return { x: newX, y: newY };
          }),
        );

        setSelectedPointInside({ x, y });
      }
    };

    const handleMouseUp = (e) => {
      setSelectedPointIndex(null);
      setSelectedPointInside(null);
    };

    (function drawOnCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw a circle at each point
      coordinates.forEach((it) => {
        ctx.beginPath();
        ctx.arc(it.x, it.y, radius, 0, 2 * Math.PI);
        ctx.closePath();
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
    })();

    if (canvas) {
      canvas.addEventListener("mousedown", handleCanvasMousedown);
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
      canvas.addEventListener("click", handleCanvasClick);

      return () => {
        canvas.removeEventListener("mousedown", handleCanvasMousedown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);
        canvas.removeEventListener("click", handleCanvasClick);
      };
    }
  }, [coordinates, selectedPointIndex, selectedPointInside]);

  return (
    <div className="draw-canvas">
      <div className="draw-canvas_wrap-img">
        <img src={QuocHocHue} alt="QuocHocHue" onLoad={handleImageLoad} />
        <canvas
          id="canvasId123"
          className="draw-canvas_wrap-img_canvasEle"
          width={clientSize.width}
          height={clientSize.height}
          style={{ cursor: checkPointEvent ? "pointer" : "" }}
        />
      </div>
    </div>
  );
};

export default DrawCanvas;
