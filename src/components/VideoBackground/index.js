import React from "react";
import "./style.scss";
import video from "./video.mp4";

const VideoBackground = () => {
  return (
    <div className="wrap-vbground">
      <div className="banner">
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
        <div className="content">
          <h1>The Body in Art</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ut
            ex, dolorem delectus possimus consequuntur labore quos voluptate
            maiores suscipit in eius expedita. Esse sequi culpa itaque, dicta
            assumenda minus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoBackground;
