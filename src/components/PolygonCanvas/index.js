/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./style.scss";
import QuocHocHue from "./quoc_hoc_hue.jpg";

const PolygonCanvas = () => {
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

    const isPointInsidePolygon = (mouseX, mouseY, vertices) => {
      ctx.beginPath();
      vertices.forEach((it, index) => {
        if (index === 0) {
          ctx.moveTo(it.x, it.y);
        } else {
          ctx.lineTo(it.x, it.y);
        }
      });
      ctx.closePath();
      return ctx.isPointInPath(mouseX, mouseY);
    };

    const handleClickedPointIndex = (mouseX, mouseY) =>
      coordinates.findIndex((it) => {
        const distance = Math.sqrt(
          Math.pow(it.x - mouseX, 2) + Math.pow(it.y - mouseY, 2),
        );
        return distance <= radius;
      });

    const handleCanvasClick = (e) => {
      const canvasTarget = e.target;
      const rect = canvasTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (!isPointInsidePolygon(mouseX, mouseY, coordinates)) {
        setCoordinates((prev) => {
          if (prev?.some((it) => it.x === mouseX && it.y === mouseY)) {
            return [...prev];
          }
          return [...prev, { x: mouseX, y: mouseY }];
        });
      }
    };

    const handleCanvasMousedown = (e) => {
      const canvasTarget = e.target;
      const rect = canvasTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (handleClickedPointIndex(mouseX, mouseY) !== -1) {
        setSelectedPointIndex(handleClickedPointIndex(mouseX, mouseY));
      } else if (isPointInsidePolygon(mouseX, mouseY, coordinates)) {
        setSelectedPointInside({ x: mouseX, y: mouseY });
      }
    };

    const handleMouseMove = (e) => {
      const canvasTarget = e.target;
      const rect = canvasTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (
        isPointInsidePolygon(mouseX, mouseY, coordinates) ||
        handleClickedPointIndex(mouseX, mouseY) !== -1
      ) {
        setCheckPointEvent(true);
      } else {
        setCheckPointEvent(false);
      }

      if (selectedPointIndex != null) {
        setCoordinates((prev) =>
          prev.map((it, index) =>
            index === selectedPointIndex ? { x: mouseX, y: mouseY } : it,
          ),
        );
      }

      if (selectedPointInside != null) {
        const dx = mouseX - selectedPointInside.x;
        const dy = mouseY - selectedPointInside.y;

        const boundingBox = {
          minX: Math.min(...coordinates.map((it) => it.x)),
          minY: Math.min(...coordinates.map((it) => it.y)),
          maxX: Math.max(...coordinates.map((it) => it.x)),
          maxY: Math.max(...coordinates.map((it) => it.y)),
        };

        // Check if moving the shape will keep it within the canvas boundaries
        const newBoundingBox = {
          minX: boundingBox.minX + dx,
          minY: boundingBox.minY + dy,
          maxX: boundingBox.maxX + dx,
          maxY: boundingBox.maxY + dy,
        };

        if (
          newBoundingBox.minX >= 0 &&
          newBoundingBox.minY >= 0 &&
          newBoundingBox.maxX <= canvas.width &&
          newBoundingBox.maxY <= canvas.height
        ) {
          setCoordinates((prev) =>
            prev.map((it) => ({ x: it.x + dx, y: it.y + dy })),
          );
          setSelectedPointInside({ x: mouseX, y: mouseY });
        } else if (
          (newBoundingBox.minX <= 0 &&
            newBoundingBox.minY >= 0 &&
            newBoundingBox.maxY <= canvas.height) ||
          (newBoundingBox.maxX >= canvas.width &&
            newBoundingBox.minY >= 0 &&
            newBoundingBox.maxY <= canvas.height)
        ) {
          setCoordinates((prev) =>
            prev.map((it) => ({ x: it.x, y: it.y + dy })),
          );
          setSelectedPointInside({ x: mouseX, y: mouseY });
        } else if (
          (newBoundingBox.minY <= 0 &&
            newBoundingBox.minX >= 0 &&
            newBoundingBox.maxX <= canvas.width) ||
          (newBoundingBox.maxY >= canvas.height &&
            newBoundingBox.minX >= 0 &&
            newBoundingBox.maxX <= canvas.width)
        ) {
          setCoordinates((prev) =>
            prev.map((it) => ({ x: it.x + dx, y: it.y })),
          );
          setSelectedPointInside({ x: mouseX, y: mouseY });
        }
      }
    };

    const handleMouseUp = (e) => {
      setSelectedPointIndex(null);
      setSelectedPointInside(null);
    };

    (function drawOnCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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

      // Draw a circle at each point
      coordinates.forEach((it) => {
        ctx.beginPath();
        ctx.arc(it.x, it.y, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = randomColor();
        ctx.fill();
      });
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
  }, [clientSize, coordinates, selectedPointIndex, selectedPointInside]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === "z") {
        handleRemove();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [coordinates]);

  const handleRemove = () => {
    setCoordinates((prev) => prev.slice(0, -1));
  };

  return (
    <div className="draw-canvas">
      <button onClick={handleRemove}>Remove</button>
      <button onClick={() => setCoordinates([])}>Reset</button>
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

export default PolygonCanvas;
