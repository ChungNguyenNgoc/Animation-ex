import React from "react";
import "./style.scss";

const GlassmorphismLogin = () => {
  return (
    <div className="glass">
      <section>
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="box">
          <div className="square" style={{ "--chung": 0 }}></div>
          <div className="square" style={{ "--chung": 1 }}></div>
          <div className="square" style={{ "--chung": 2 }}></div>
          <div className="square" style={{ "--chung": 3 }}></div>
          <div className="square" style={{ "--chung": 4 }}></div>

          <div className="container">
            <div className="form">
              <h2 className="title">Login Form</h2>
              <form>
                <div className="inputBox">
                  <input type="text" placeholder="Username"></input>
                </div>
                <div className="inputBox">
                  <input type="password" placeholder="Password"></input>
                </div>
                <div className="inputBox">
                  <input type="submit" value="Login"></input>
                </div>
                <p className="forget">
                  Forgot password ?<a href="#">Click here</a>
                </p>
                <p className="forget">
                  Dont'n have an account ? ?<a href="#">Sign up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GlassmorphismLogin;
