import React from "react";
import "./style.scss";
import logo from "./logo.png";
import menu from "./menu.png";
import fb from "./fb.png";
import ig from "./ig.png";
import tw from "./tw.png";
import share from "./share.png";
import info from "./info.png";
import bubble from "./bubble.png";

const CreativeStudio = () => {
  return (
    <div className="creative-studio">
      <div className="navbar">
        <img className="logo" src={logo} alt="" />
        <button type="button">Sign Up</button>
      </div>
      <div className="content">
        <small>Welcome to our</small>
        <h1>
          World's
          <br />
          Creative Studio
        </h1>
        <button type="button">Take a tour</button>
      </div>
      <div className="side-bar">
        <img className="menu" src={menu} alt="" />
        <div className="social-links">
          <img src={fb} alt="" />
          <img src={ig} alt="" />
          <img src={tw} alt="" />
        </div>
        <div className="useful-links">
          <img src={share} alt="" />
          <img src={info} alt="" />
        </div>
      </div>
      <div className="bubbles">
        <img src={bubble} alt="" />
        <img src={bubble} alt="" />
        <img src={bubble} alt="" />
        <img src={bubble} alt="" />
        <img src={bubble} alt="" />
        <img src={bubble} alt="" />
        <img src={bubble} alt="" />
        <img src={bubble} alt="" />
      </div>
    </div>
  );
};

export default CreativeStudio;
