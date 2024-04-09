import React from "react";
import "./style.scss";

const GlowEffects = () => {
  return (
    <div className="glow-effects">
      <section>
        <div className="box">
          <div className="cube">
            <div className="shadow"></div>
            <div className="wap">
              <span style={{ "--i": 0 }}></span>
              <span style={{ "--i": 1 }}></span>
              <span style={{ "--i": 2 }}></span>
              <span style={{ "--i": 3 }}></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GlowEffects;
