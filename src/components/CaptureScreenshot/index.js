import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import QuocHocHue from "./quoc_hoc_hue.jpg";
import html2canvas from "html2canvas";

const CaptureScreenshot = () => {
  const divRef = useRef();
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const captureScreenshot = () => {
    const divElement = divRef.current;

    if (divElement == null) {
      return;
    }

    html2canvas(divElement, { scale: 0.5 }).then((canvas) => {
      console.debug("canvas: ", canvas);

      const base64Url = canvas.toDataURL("image/png");
      setImageUrl(base64Url);
      const newWindow = window.open();
      newWindow.document.write('<img src="' + base64Url + '" />');
    });
  };

  const base64toFile = (base64String, filename) => {
    const parts = base64String.split(";base64,");
    const type = parts[0].split(":")[1];

    const byteString = atob(parts[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type });
    return new File([blob], filename, { type });
  };

  useEffect(() => {
    if (imageUrl == null) {
      return;
    }
    const file = base64toFile(imageUrl, "capture_image");
    if (file != null) {
      setImageFile(file);
    }
  }, [imageUrl]);

  return (
    <div className="capture-screenshot">
      <div
        ref={divRef}
        style={{ width: 700, height: 400 }}
        className="capture-screenshot_ref"
      >
        <div className="capture-screenshot_ref_item">
          <span>Chung NguyenNgoc</span>
          <img src={QuocHocHue} alt="image" />
          <svg height={220} width={500} xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="100,10 150,190 50,190"
              style={{ fill: "lime", stroke: "purple", strokeWidth: 3 }}
            />
          </svg>
        </div>
      </div>
      <button onClick={captureScreenshot}>Capture Screenshot</button>
    </div>
  );
};

export default CaptureScreenshot;
