import React from "react";
import "./style.scss";

const CheckBox = () => {
  return (
    <div className="wrap-check">
      <div className="container">
        <p>Are you like this ?</p>
        <label>
          <input type="radio" name="yesNo" />
          <span className="check"></span>
          Yes
        </label>
        <label>
          <input type="radio" name="yesNo" />
          <span className="cross"></span>
          No
        </label>
      </div>
    </div>
  );
};

export default CheckBox;
