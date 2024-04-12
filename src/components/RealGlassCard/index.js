import React from "react";
import "./style.scss";
import Card from "./components/Card";

const RealGlassCard = () => {
  return (
    <div className="real-glass-container">
      <div className="real-glass-container_list-card">
        {new Array(3).fill(0).map((_, index) => (
          <Card key={index} indexProps={index} />
        ))}
      </div>
    </div>
  );
};

export default RealGlassCard;
