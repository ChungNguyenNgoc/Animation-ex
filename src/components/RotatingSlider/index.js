/* eslint-disable no-unused-vars */
import React from "react";
import "./style.scss";
import chung1 from "./chung1.jpg";
import chung2 from "./chung2.jpg";
import chung3 from "./chung3.jpg";
import chung4 from "./chung4.jpg";
import chung5 from "./chung5.jpg";
import chung6 from "./chung6.jpg";
import chung7 from "./chung7.jpg";
import chung8 from "./chung8.jpg";
import poster from "./poster.jpg";

const RotatingSlider = () => {
  return (
    <div className="rotate-wrap">
      <div className="rotating-slider">
        <div className="box">
          <span style={{ "--i": 1 }}>
            <img src={chung1} alt="" />
          </span>
          <span style={{ "--i": 2 }}>
            <img src={chung2} alt="" />
          </span>
          <span style={{ "--i": 3 }}>
            <img src={chung3} alt="" />
          </span>
          <span style={{ "--i": 4 }}>
            <img src={chung4} alt="" />
          </span>
          <span style={{ "--i": 5 }}>
            <img src={chung5} alt="" />
          </span>
          <span style={{ "--i": 6 }}>
            <img src={chung6} alt="" />
          </span>
          <span style={{ "--i": 7 }}>
            <img src={chung7} alt="" />
          </span>
          <span style={{ "--i": 8 }}>
            <img src={chung8} alt="" />
          </span>
        </div>
        <div className="box2">
          <span style={{ "--i": 1 }}>
            <img src={poster} alt="" />
          </span>
          <span style={{ "--i": 2 }}>
            <img src={poster} alt="" />
          </span>
          <span style={{ "--i": 3 }}>
            <img src={poster} alt="" />
          </span>
          <span style={{ "--i": 4 }}>
            <img src={poster} alt="" />
          </span>
          <span style={{ "--i": 5 }}>
            <img src={poster} alt="" />
          </span>
          <span style={{ "--i": 6 }}>
            <img src={poster} alt="" />
          </span>
          <span style={{ "--i": 7 }}>
            <img src={poster} alt="" />
          </span>
          <span style={{ "--i": 8 }}>
            <img src={poster} alt="" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default RotatingSlider;
