import React from "react";
import "./style.scss";

const ToastMessage = () => {
  return (
    <div className="wrap-toast">
      <div id="toast" className="toast-mess success">
        <div className="icon">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <div className="body">
          <h3 className="title">Success</h3>
          <p className="message">Front-End developer at Alta Software</p>
        </div>
        <div className="close">
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
{/* 
      <div className="toast-mess info">
        <div className="icon">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <div className="body">
          <h3 className="title">Information</h3>
          <p className="message">Front-End developer at Alta Software</p>
        </div>
        <div className="close">
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>

  
      <div className="toast-mess warning">
        <div className="icon">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <div className="body">
          <h3 className="title">Warning</h3>
          <p className="message">Front-End developer at Alta Software</p>
        </div>
        <div className="close">
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>


      <div className="toast-mess error">
        <div className="icon">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <div className="body">
          <h3 className="title">Error</h3>
          <p className="message">Front-End developer at Alta Software</p>
        </div>
        <div className="close">
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div> */}
    </div>
  );
};

export default ToastMessage;
