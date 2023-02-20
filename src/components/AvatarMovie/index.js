import React from "react";
import "./style.scss";
import poster from "./poster.jpg";
import avatarlogo from "./avatarlogo.png";
import cast1 from "./cast1.jpg";
import cast2 from "./cast2.jpg";
import cast3 from "./cast3.jpg";
import cast4 from "./cast4.jpg";
import cast5 from "./cast5.jpg";

const AvatarMovie = () => {
  return (
    <div className="avatar-movie">
      <div className="card">
        <div className="poster">
          <img src={poster} alt="" />
        </div>
        <div className="details">
          <img className="logo" src={avatarlogo} alt="" />
          <h3>Directed by Chung NguyenNgoc</h3>
          <div className="rating">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-sharp fa-regular fa-star"></i>
            <span>4/5</span>
          </div>
          <div className="tags">
            <span>Sci-fi</span>
            <span>Action</span>
          </div>
          <div className="info">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
              officia nam vel distinctio quo recusandae fugiat quasi minus
              aperiam ab?
            </p>
          </div>
          <div className="cast">
            <h4>Cast</h4>
            <ul>
              <li>
                <img src={cast1} alt="" />
              </li>
              <li>
                <img src={cast2} alt="" />
              </li>
              <li>
                <img src={cast3} alt="" />
              </li>
              <li>
                <img src={cast4} alt="" />
              </li>
              <li>
                <img src={cast5} alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarMovie;
