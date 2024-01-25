import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import QuocHocHue from "./quoc_hoc_hue.jpg";

const DrawCanvas = () => {
  const canvasRef = useRef(null);
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

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    console.debug("e: ", e);
  };

  useEffect(() => {
    const img = document.getElementById("imageId123");
    const width = img.clientWidth;
    const height = img.clientHeight;
    setClientSize({ width, height });
  }, []);

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
          className="draw-canvas_wrap-img_canvasEle"
          ref={canvasRef}
          width={clientSize.width}
          height={clientSize.height}
          onClick={handleCanvasClick}
        />
      </div>
    </div>
  );
};

export default DrawCanvas;
