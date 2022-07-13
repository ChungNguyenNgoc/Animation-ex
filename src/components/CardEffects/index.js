import React from "react";
import "./style.scss";
import img from "./chung3.jpg";

const CardEffects = () => {
  return (
    <div className="cart-eff">
      <div className="container">
        <input type="checkbox" name="" />
        <div className="toggle">+</div>
        <div className="imgBx">
          <img src={img} />
        </div>
        <div className="detail">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex esse
            odio aut eaque cum officiis optio reiciendis recusandae deserunt
            autem fuga ab obcaecati, temporibus ipsam saepe. Tempora pariatur
            aperiam provident.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardEffects;
