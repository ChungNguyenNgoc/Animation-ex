import React from "react";
import "./style.scss";

const ParallaxCard = () => {
  return (
    <div className="parallax-card">
      <div className="parallax-card_container">
        <div className="parallax-card_container_card">
          <div className="parallax-card_container_card_logo">
            <span className="circle circle1"></span>
            <span className="circle circle2"></span>
            <span className="circle circle3"></span>
            <span className="circle circle4"></span>
            <span className="circle circle5">
              <i className="fa-solid fa-seedling"></i>
            </span>
          </div>
          <div className="parallax-card_container_card_glass">
            <div className="parallax-card_container_card_glass_content">
              <h1>Rayen</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Labore, quas!
              </p>
            </div>
            <div className="parallax-card_container_card_glass_footer">
              <div className="parallax-card_container_card_glass_footer_social">
                <span className="parallax-card_container_card_glass_footer_social_icons">
                  <i className="fa-brands fa-facebook"></i>
                </span>
                <span className="parallax-card_container_card_glass_footer_social_icons">
                  <i className="fa-brands fa-instagram"></i>
                </span>
                <span className="parallax-card_container_card_glass_footer_social_icons">
                  <i className="fa-brands fa-linkedin"></i>
                </span>
              </div>
              <div className="parallax-card_container_card_glass_footer_link">
                <span>Read More</span>{" "}
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxCard;
