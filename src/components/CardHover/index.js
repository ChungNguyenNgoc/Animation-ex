import React from "react";
import "./style.scss";
import QuocHocHue from "./quoc_hoc_hue.jpg";

const CardHover = () => {
  return (
    <div className="card-hover-container">
      <div className="card-hover-container_wrap">
        {new Array(3).fill(0).map((_, index) => (
          <article key={index} className="card-hover-container_wrap_article">
            <img src={QuocHocHue} alt="image" />
            <div className="card-hover-container_wrap_article_data">
              <span className="card-hover-container_wrap_article_data_desc">
                Chung NguyenNgoc {index}
              </span>
              <h2 className="card-hover-container_wrap_article_data_title">
                The Great Path {index}
              </h2>
              <a
                href="#"
                className="card-hover-container_wrap_article_data_btn"
              >
                Read More {index}
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default CardHover;
