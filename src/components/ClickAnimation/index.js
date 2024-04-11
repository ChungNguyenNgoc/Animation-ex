import React, { useEffect } from "react";
import "./style.scss";

const ClickAnimation = () => {
  useEffect(() => {
    let clickElement = document.getElementById("click-animation-id");
    if (clickElement != null) {
      const handleBodyClick = (e) => {
        let spark = document.createElement("div");
        if (spark != null) {
          spark.classList.add("spark");
          clickElement.appendChild(spark);

          spark.style.top = e.clientY - clickElement.offsetTop + "px";
          spark.style.left = e.clientX - clickElement.offsetLeft + "px";
          spark.style.filter = `hue-rotate(${Math.random() * 360}deg)`;

          for (let i = 0; i < 8; i++) {
            let span = document.createElement("span");
            if (span != null) {
              span.classList.add("spanEle");
              span.style.transform = `rotate(${i * 45}deg)`;
              spark.appendChild(span);
            }
          }

          setTimeout(() => {
            spark.remove();
          }, 1000);
        }
      };

      clickElement.addEventListener("click", handleBodyClick);

      return () => {
        console.debug("clean up event");
        clickElement.removeEventListener("click", handleBodyClick);
      };
    }
  }, []);

  return <div id="click-animation-id" className="click-animation"></div>;
};

export default ClickAnimation;
