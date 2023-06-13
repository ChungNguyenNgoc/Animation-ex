/* eslint-disable no-unused-vars */
import React from "react";
import "./style.scss";

const LoadingAnimate = () => {
  const arr = [];
  for (let i = 0; i < 6; i++) {
    arr.push(<div className="loader--dot"></div>);
  }
  return (
    <div className="loading-animate">
      <div className="loader">
        {arr.length > 0 && arr.map((it) => it)}
        <div className="loader--text"></div>
      </div>
    </div>
  );
};

export default LoadingAnimate;
