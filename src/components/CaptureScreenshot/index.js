import React, { useRef, useState } from "react";
import "./style.scss";
import QuocHocHue from "./quoc_hoc_hue.jpg";
import html2canvas from "html2canvas";

const CaptureScreenshot = () => {
  const divRef = useRef();
  const [dataUrl, setDataUrl] = useState(null);

  const captureScreenshot = () => {
    const divElement = divRef.current;

    if (divElement == null) {
      return;
    }

    html2canvas(divElement).then((canvas) => {
      const base64Url = canvas.toDataURL("image/png");
      setDataUrl(base64Url);
      const newWindow = window.open();
      newWindow.document.write('<img src="' + base64Url + '" />');
    });
  };

  return (
    <div className="capture-screenshot">
      <div ref={divRef} className="capture-screenshot_ref">
        <div className="capture-screenshot_ref_item">
          <span>Chung NguyenNgoc</span>
          <img src={QuocHocHue} alt="image" />
        </div>
      </div>
      <button onClick={captureScreenshot}>Capture Screenshot</button>
    </div>
  );
};

export default CaptureScreenshot;
