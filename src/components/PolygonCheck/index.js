import React from "react";
import "./style.scss";

const PolygonCheck = () => {
  // Add event listener on component mount
  React.useEffect(() => {
    const svg = document.getElementById("svg-id");
    const polygon = document.getElementById("polygon-id");

    const isPointInsidePolygon = (point, polygon) => {
      const points = polygon.points;
      let inside = false;
      let j = points.length - 1;

      for (let i = 0; i < points.length; j = i++) {
        const xi = points[i].x;
        const yi = points[i].y;
        const xj = points[j].x;
        const yj = points[j].y;

        const intersect =
          yi > point.y != yj > point.y &&
          point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;

        if (intersect) {
          inside = !inside;
        }
      }

      return inside;
    };

    const handleSvgClick = (e) => {
      const point = { x: e.clientX, y: e.clientY };
      console.debug("point: ", point);
      console.debug("isPoint: ", isPointInsidePolygon(point, polygon));
    };

    svg.addEventListener("click", handleSvgClick);
    return () => {
      svg.removeEventListener("click", handleSvgClick);
    };
  }, []);

  return (
    <div className="test-page">
      <svg id="svg-id" height="1000" width="1000">
        <polygon
          id="polygon-id"
          points="100,10 40,198 190,78 10,78 160,198"
          style={{
            fill: "lime",
            stroke: "purple",
            strokeWidth: 2,
            fillRule: "evenodd",
          }}
        />
      </svg>
    </div>
  );
};

export default PolygonCheck;
