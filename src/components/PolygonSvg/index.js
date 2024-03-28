/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable max-statements */
import "./style.scss";

import React, { useEffect, useState } from "react";

import {
  DirectionIcon,
  PenIcon,
  RefreshIcon,
  ReturnIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "@assets/icon";
import ResetIcon from "@assets/icon/resetIcon";
import { TestCaptureCamera } from "@assets/images";

const CaptureCameraBySvg = () => {
  const radius = 6;
  const [scaleWrapElement, setScaleWrapElement] = useState(1);
  const [featuresActive, setFeaturesActive] = useState([]);
  const [ratioNatural, setRatioNatural] = useState(1);
  const [imgRatio, setImgRatio] = useState(1);
  const [clientSize, setClientSize] = useState({
    width: 0,
    height: 0,
  });
  const [coordinates, setCoordinates] = useState([]);
  const [centerCoordinate, setCenterCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [orientation, setOrientation] = useState(0);
  const [selectedPointIndex, setSelectedPointIndex] = useState(null);
  const [selectedPointInside, setSelectedPointInside] = useState(null);
  const [startPanPoint, setStartPanPoint] = useState({
    x: 0,
    y: 0,
  });
  const [offsetPanPoint, setOffsetPanPoint] = useState({
    x: 0,
    y: 0,
  });
  const [isPan, setIsPan] = useState(false);
  const [isCanPan, setIsCanPan] = useState(false);
  const [isCanPaint, setIsCanPaint] = useState(false);
  const [isSelectedPointInSide, setIsSelectedPointInSide] = useState(false);
  const [widthCaptureCamera, setWidthCaptureCamera] = useState(
    (window.innerWidth * 40) / 100,
  );
  const [loadHandlerKey, setLoadHandlerKey] = useState(0);

  useEffect(() => {
    setLoadHandlerKey((prevKey) => prevKey + 1);
  }, [widthCaptureCamera]);

  useEffect(() => {
    const handleResize = () => {
      setWidthCaptureCamera((window.innerWidth * 40) / 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const featuresIcon = [
    {
      idAction: 1,
      icon: <PenIcon className="pen-icon" />,
    },
    {
      idAction: 2,
      icon: <DirectionIcon className="pen-icon" />,
    },
    {
      idAction: 3,
      icon: <ReturnIcon />,
    },
    {
      idAction: 4,
      icon: <ResetIcon />,
    },
    {
      idAction: 5,
      icon: <ZoomInIcon />,
    },
    {
      idAction: 6,
      icon: <ZoomOutIcon />,
    },
  ];

  const handleImageLoad = (e) => {
    setRatioNatural(e.target.naturalWidth / widthCaptureCamera);
    setImgRatio(e.target.naturalWidth / e.target.naturalHeight);
    setClientSize({
      width: e.target.clientWidth,
      height: e.target.clientHeight,
    });
  };

  const handleRemove = () => {
    setCoordinates((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === "z") {
        handleRemove();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [coordinates]);

  const handleFeature = (id) => {
    if (id === 1) {
      if (featuresActive?.includes(id)) {
        setFeaturesActive([...featuresActive?.filter((it) => it !== id)]);
      } else {
        setFeaturesActive([...featuresActive, id]?.filter((it) => it !== 2));
      }
    } else if (id === 2) {
      if (featuresActive?.includes(id)) {
        setFeaturesActive([...featuresActive?.filter((it) => it !== id)]);
      } else {
        setFeaturesActive([...featuresActive, id]?.filter((it) => it !== 1));
      }
    } else if (id === 3) {
      handleRemove();
    } else if (id === 4) {
      setCoordinates([]);
    } else if (id === 5) {
      if (scaleWrapElement >= 1 && scaleWrapElement < 2) {
        setScaleWrapElement(scaleWrapElement + 0.5);
      }
    } else if (id === 6) {
      if (scaleWrapElement > 1) {
        setScaleWrapElement(scaleWrapElement - 0.5);
      }

      if (scaleWrapElement === 2) {
        const maxOffsetPanPointBefore = {
          x: clientSize.width * (scaleWrapElement - 0.5) - clientSize.width,
          y: clientSize.height * (scaleWrapElement - 0.5) - clientSize.height,
        };
        if (
          -offsetPanPoint.x > maxOffsetPanPointBefore.x + 15 &&
          -offsetPanPoint.y > maxOffsetPanPointBefore.y + 15
        ) {
          setOffsetPanPoint({
            x: -maxOffsetPanPointBefore.x,
            y: -maxOffsetPanPointBefore.y,
          });
        } else if (
          -offsetPanPoint.x > maxOffsetPanPointBefore.x + 15 &&
          -offsetPanPoint.y < maxOffsetPanPointBefore.y + 15
        ) {
          setOffsetPanPoint((prev) => ({
            x: -maxOffsetPanPointBefore.x,
            y: prev.y,
          }));
        } else if (
          -offsetPanPoint.x < maxOffsetPanPointBefore.x + 15 &&
          -offsetPanPoint.y > maxOffsetPanPointBefore.y + 15
        ) {
          setOffsetPanPoint((prev) => ({
            x: prev.x,
            y: -maxOffsetPanPointBefore.y,
          }));
        }
      }
    }
  };

  useEffect(() => {
    if (scaleWrapElement > 1 && !featuresActive?.includes(1)) {
      setIsCanPan(true);
    } else {
      setIsCanPan(false);
    }
  }, [featuresActive, scaleWrapElement]);

  useEffect(() => {
    const wrapElementWidth = widthCaptureCamera * scaleWrapElement;
    const wrapElementHeight =
      (widthCaptureCamera / imgRatio) * scaleWrapElement;
    const wrapElement = document.getElementById(
      `capture-cam-wrap-svg-and-img-id`,
    );
    const polygon = document.getElementById(`capture-cam-polygon-id`);

    const centerX =
      coordinates.reduce((sum, it) => sum + it.x, 0) / coordinates.length;
    const centerY =
      coordinates.reduce((sum, it) => sum + it.y, 0) / coordinates.length;
    setCenterCoordinate({
      x: centerX * scaleWrapElement,
      y: centerY * scaleWrapElement,
    });

    const isPointInsidePolygon = (point, polygonParam) => {
      const points = polygonParam?.points;
      let inside = false;
      let j = points.length - 1;

      for (let i = 0; i < points.length; j = i++) {
        const xi = points[i].x;
        const yi = points[i].y;
        const xj = points[j].x;
        const yj = points[j].y;

        const intersect =
          yi > point.y !== yj > point.y &&
          point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;

        if (intersect) {
          inside = !inside;
        }
      }

      return inside;
    };

    const handleClickedPointIndex = (mouseX, mouseY) =>
      coordinates.findIndex((it) => {
        const distance = Math.sqrt(
          Math.pow(it.x * scaleWrapElement - mouseX, 2) +
            Math.pow(it.y * scaleWrapElement - mouseY, 2),
        );
        return distance <= radius;
      });

    const handleMousedown = (e) => {
      if (isCanPan) {
        return;
      }

      const eTarget = e.target;
      const rect = eTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (handleClickedPointIndex(mouseX, mouseY) !== -1) {
        setSelectedPointIndex(handleClickedPointIndex(mouseX, mouseY));
      } else if (isPointInsidePolygon({ x: mouseX, y: mouseY }, polygon)) {
        setSelectedPointInside({
          x: mouseX / scaleWrapElement,
          y: mouseY / scaleWrapElement,
        });
      }
      if (!isPointInsidePolygon({ x: mouseX, y: mouseY }, polygon)) {
        setIsCanPaint(true);
      }
    };

    const handleMouseMove = (e) => {
      if (isCanPan) {
        return;
      }

      const eTarget = e.target;
      const rect = eTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (isPointInsidePolygon({ x: mouseX, y: mouseY }, polygon)) {
        setIsSelectedPointInSide(true);
      } else {
        setIsSelectedPointInSide(false);
      }

      if (selectedPointIndex != null) {
        setCoordinates((prev) =>
          prev.map((it, index) =>
            index === selectedPointIndex
              ? { x: mouseX / scaleWrapElement, y: mouseY / scaleWrapElement }
              : it,
          ),
        );
      }

      if (selectedPointInside != null) {
        const dx = mouseX / scaleWrapElement - selectedPointInside.x;
        const dy = mouseY / scaleWrapElement - selectedPointInside.y;

        const boundingBox = {
          minX: Math.min(...coordinates.map((it) => it.x)),
          minY: Math.min(...coordinates.map((it) => it.y)),
          maxX: Math.max(...coordinates.map((it) => it.x)),
          maxY: Math.max(...coordinates.map((it) => it.y)),
        };

        // Check if moving the shape will keep it within the canvas boundaries
        const newBoundingBox = {
          minX: boundingBox.minX + dx,
          minY: boundingBox.minY + dy,
          maxX: boundingBox.maxX + dx,
          maxY: boundingBox.maxY + dy,
        };

        if (
          newBoundingBox.minX >= 0 &&
          newBoundingBox.minY >= 0 &&
          newBoundingBox.maxX <= wrapElementWidth / scaleWrapElement &&
          newBoundingBox.maxY <= wrapElementHeight / scaleWrapElement
        ) {
          setCoordinates((prev) =>
            prev.map((it) => ({ x: it.x + dx, y: it.y + dy })),
          );
          setSelectedPointInside({
            x: mouseX / scaleWrapElement,
            y: mouseY / scaleWrapElement,
          });
        } else if (
          (newBoundingBox.minX <= 0 &&
            newBoundingBox.minY >= 0 &&
            newBoundingBox.maxY <= wrapElementHeight / scaleWrapElement) ||
          (newBoundingBox.maxX >= wrapElementWidth / scaleWrapElement &&
            newBoundingBox.minY >= 0 &&
            newBoundingBox.maxY <= wrapElementHeight / scaleWrapElement)
        ) {
          setCoordinates((prev) =>
            prev.map((it) => ({ x: it.x, y: it.y + dy })),
          );
          setSelectedPointInside({
            x: mouseX / scaleWrapElement,
            y: mouseY / scaleWrapElement,
          });
        } else if (
          (newBoundingBox.minY <= 0 &&
            newBoundingBox.minX >= 0 &&
            newBoundingBox.maxX <= wrapElementWidth / scaleWrapElement) ||
          (newBoundingBox.maxY >= wrapElementHeight / scaleWrapElement &&
            newBoundingBox.minX >= 0 &&
            newBoundingBox.maxX <= wrapElementWidth / scaleWrapElement)
        ) {
          setCoordinates((prev) =>
            prev.map((it) => ({ x: it.x + dx, y: it.y })),
          );
          setSelectedPointInside({
            x: mouseX / scaleWrapElement,
            y: mouseY / scaleWrapElement,
          });
        }
      }
    };

    const handleMouseUp = (e) => {
      if (isCanPan) {
        return;
      }
      setSelectedPointIndex(null);
      setSelectedPointInside(null);
      const eTarget = e.target;
      const rect = eTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (isCanPaint === true) {
        setCoordinates((prev) => {
          if (
            prev?.some(
              (it) =>
                it.x === mouseX / scaleWrapElement &&
                it.y === mouseY / scaleWrapElement,
            )
          ) {
            return [...prev];
          }
          return [
            ...prev,
            { x: mouseX / scaleWrapElement, y: mouseY / scaleWrapElement },
          ];
        });
      }
      setIsCanPaint(false);
    };

    const handleMouseLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setSelectedPointIndex(null);
      setSelectedPointInside(null);
    };

    if (wrapElement) {
      wrapElement.addEventListener("mousedown", handleMousedown);
      wrapElement.addEventListener("mousemove", handleMouseMove);
      wrapElement.addEventListener("mouseup", handleMouseUp);
      wrapElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        wrapElement.removeEventListener("mousedown", handleMousedown);
        wrapElement.removeEventListener("mousemove", handleMouseMove);
        wrapElement.removeEventListener("mouseup", handleMouseUp);
        wrapElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [
    widthCaptureCamera,
    coordinates,
    scaleWrapElement,
    imgRatio,
    clientSize,
    selectedPointIndex,
    selectedPointInside,
    isCanPan,
    isCanPaint,
    isSelectedPointInSide,
  ]);

  useEffect(() => {
    const wrapCaptureElementWidth = clientSize.width;
    const wrapCaptureElementHeight = clientSize.height;
    const wrapCaptureElement = document.getElementById(`wrap-capture-id`);

    const handleMousedown = (e) => {
      const eTarget = e.target;
      const rect = eTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (isCanPan) {
        setIsPan(true);
        setStartPanPoint({
          x: mouseX,
          y: mouseY,
        });
      }
    };

    const handleMouseMove = (e) => {
      const eTarget = e.target;
      const rect = eTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (isCanPan && isPan) {
        const dx = mouseX - startPanPoint.x;
        const dy = mouseY - startPanPoint.y;

        const newBoundingBox = {
          x: -offsetPanPoint.x - dx,
          y: -offsetPanPoint.y - dy,
        };

        if (
          newBoundingBox.x >= 0 &&
          newBoundingBox.x <=
            wrapCaptureElementWidth * scaleWrapElement -
              wrapCaptureElementWidth &&
          newBoundingBox.y >= 0 &&
          newBoundingBox.y <=
            wrapCaptureElementHeight * scaleWrapElement -
              wrapCaptureElementHeight
        ) {
          setOffsetPanPoint((prevOffsetX) => ({
            x: prevOffsetX.x + dx,
            y: prevOffsetX.y + dy,
          }));
          setStartPanPoint({
            x: mouseX,
            y: mouseY,
          });
        } else if (
          (newBoundingBox.x <= 0 &&
            newBoundingBox.y >= 0 &&
            newBoundingBox.y <=
              wrapCaptureElementHeight * scaleWrapElement -
                wrapCaptureElementHeight) ||
          (newBoundingBox.x >=
            wrapCaptureElementWidth * scaleWrapElement -
              wrapCaptureElementWidth &&
            newBoundingBox.y >= 0 &&
            newBoundingBox.y <=
              wrapCaptureElementHeight * scaleWrapElement -
                wrapCaptureElementHeight)
        ) {
          setOffsetPanPoint((prevOffsetX) => ({
            x: prevOffsetX.x,
            y: prevOffsetX.y + dy,
          }));
          setStartPanPoint({
            x: mouseX,
            y: mouseY,
          });
        } else if (
          (newBoundingBox.y <= 0 &&
            newBoundingBox.x >= 0 &&
            newBoundingBox.x <=
              wrapCaptureElementWidth * scaleWrapElement -
                wrapCaptureElementWidth) ||
          (newBoundingBox.y >=
            wrapCaptureElementHeight * scaleWrapElement -
              wrapCaptureElementHeight &&
            newBoundingBox.x >= 0 &&
            newBoundingBox.x <=
              wrapCaptureElementWidth * scaleWrapElement -
                wrapCaptureElementWidth)
        ) {
          setOffsetPanPoint((prevOffsetX) => ({
            x: prevOffsetX.x + dx,
            y: prevOffsetX.y,
          }));
          setStartPanPoint({
            x: mouseX,
            y: mouseY,
          });
        }
      }
    };

    const handleMouseUp = () => {
      if (isCanPan && isPan) {
        setIsPan(false);
      }
    };

    const handleMouseLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isCanPan && isPan) {
        setIsPan(false);
      }
    };

    if (wrapCaptureElement) {
      wrapCaptureElement.addEventListener("mousedown", handleMousedown);
      wrapCaptureElement.addEventListener("mousemove", handleMouseMove);
      wrapCaptureElement.addEventListener("mouseup", handleMouseUp);
      wrapCaptureElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        wrapCaptureElement.removeEventListener("mousedown", handleMousedown);
        wrapCaptureElement.removeEventListener("mousemove", handleMouseMove);
        wrapCaptureElement.removeEventListener("mouseup", handleMouseUp);
        wrapCaptureElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [
    clientSize,
    isCanPan,
    scaleWrapElement,
    isPan,
    startPanPoint,
    offsetPanPoint,
  ]);

  const CenterCoordinate = React.useMemo(() => {
    if (coordinates.length < 3 || featuresActive?.every((id) => id !== 2)) {
      return <></>;
    }
    return (
      <div
        style={{
          left: 0,
          top: 0,
          transform: `translate(${
            scaleWrapElement === 1
              ? centerCoordinate.x
              : centerCoordinate.x + offsetPanPoint.x
          }px, ${
            scaleWrapElement === 1
              ? centerCoordinate.y
              : centerCoordinate.y + offsetPanPoint.y
          }px)`,
          transition:
            scaleWrapElement > 1 && isCanPan ? "transform 0.1s ease" : "unset",
        }}
        className="capture-camera-by-svg_content_actions_wrap-draw_direction"
      >
        <div
          className={`capture-camera-by-svg_content_actions_wrap-draw_direction_target ${
            orientation === 180 ? "rotate" : ""
          }`}
        ></div>
        <div
          onClick={() => {
            setOrientation(orientation === 0 ? 180 : 0);
          }}
          className="capture-camera-by-svg_content_actions_wrap-draw_direction_action"
        >
          <RefreshIcon />
        </div>
      </div>
    );
  }, [
    centerCoordinate,
    coordinates,
    featuresActive,
    orientation,
    startPanPoint,
    offsetPanPoint,
  ]);

  return (
    <div className="capture-camera-by-svg">
      <div className="capture-camera-by-svg_content">
        <div className="capture-camera-by-svg_content_actions">
          <div
            id={`wrap-capture-id`}
            style={{ width: clientSize.width, height: clientSize.height }}
            className="capture-camera-by-svg_content_actions_wrap-draw"
          >
            <div
              id={`capture-cam-wrap-svg-and-img-id`}
              style={{
                width: widthCaptureCamera * scaleWrapElement,
                height: (widthCaptureCamera / imgRatio) * scaleWrapElement,
                left: 0,
                top: 0,
                transformOrigin: "top left",
                transform: `translate(${
                  scaleWrapElement === 1 ? 0 : offsetPanPoint.x
                }px, ${scaleWrapElement === 1 ? 0 : offsetPanPoint.y}px)`,
                transition: "transform 0.1s ease",
                cursor: isSelectedPointInSide === true ? "move" : "pointer",
                pointerEvents:
                  !featuresActive?.includes(1) && scaleWrapElement === 1
                    ? "none"
                    : undefined,
              }}
              className="capture-camera-by-svg_content_actions_wrap-draw_wrap-svg"
            >
              <img
                key={loadHandlerKey}
                style={{ left: 0, top: 0 }}
                src={TestCaptureCamera}
                alt="image-capture"
                onLoad={handleImageLoad}
              />
              <svg
                id={`capture-cam-svg-id`}
                style={{ left: 0, top: 0 }}
                width={widthCaptureCamera * scaleWrapElement}
                height={(widthCaptureCamera / imgRatio) * scaleWrapElement}
              >
                <polygon
                  id={`capture-cam-polygon-id`}
                  points={`${coordinates
                    ?.map(
                      (it) =>
                        `${it.x * scaleWrapElement},${it.y * scaleWrapElement}`,
                    )
                    ?.join(" ")}`}
                  style={{
                    pointerEvents: "none",
                    fill: "#ffffff80",
                    stroke: "#f62323",
                    strokeWidth: 2,
                    fillRule: "evenodd",
                  }}
                />
                {coordinates?.map((point, index) => (
                  <circle
                    style={{ pointerEvents: "none" }}
                    key={index}
                    cx={point.x * scaleWrapElement}
                    cy={point.y * scaleWrapElement}
                    r={radius}
                    fill="#f62323"
                  />
                ))}
              </svg>
            </div>
            {CenterCoordinate}
          </div>
        </div>
        <div className="capture-camera-by-svg_content_features">
          {featuresIcon.map((it, index) => {
            return (
              <div
                key={index}
                onClick={() => handleFeature(it?.idAction)}
                className={`capture-camera-by-svg_content_features_icon ${
                  featuresActive?.some((id) => id === it?.idAction)
                    ? "active-icon"
                    : ""
                }`}
              >
                {it?.icon}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(CaptureCameraBySvg);
