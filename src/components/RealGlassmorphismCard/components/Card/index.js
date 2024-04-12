import React, { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

const Card = (props) => {
  const ref = useRef();

  useEffect(() => {
    VanillaTilt.init(ref.current, {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.5,
    });
  }, []);

  return (
    <div
      key={props.indexProps}
      ref={ref}
      className="real-glass-container_list-card_card"
    >
      <div className="real-glass-container_list-card_card_content">
        <h2>{(props.indexProps + 1).toString().padStart(2, "0")}</h2>
        <h3>Card One</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          consequatur illum libero iste necessitatibus excepturi?
        </p>
        <a href="#">Read more</a>
      </div>
    </div>
  );
};

export default Card;
