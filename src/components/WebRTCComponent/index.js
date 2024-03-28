import React, { useEffect, useRef } from "react";
import "./style.scss";
import io from "socket.io-client";

const WebRTCComponent = () => {
  const wssServer =
    "wss://hgdc-go2rtc.dev-altamedia.com/api/ws?src=71auuaZnK56WdfVpFIrPX2aXYff8nc2e2BFfMul4jcGCQhbVKtCMM5zvbC_NpHD0WdeoBVQROsSOK8mF9NtZiB4mmPzBFO5hmrd0&media=video+audio";
  const videoRef = useRef(null);
  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    socketRef.current = io.connect(wssServer);
    peerConnectionRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    socketRef.current.on("message", handleMessage);
    setupLocalStream();

    return () => {
      socketRef.current.disconnect();
      peerConnectionRef.current.close();
    };
  }, []);

  const setupLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      stream
        .getTracks()
        .forEach((track) => peerConnectionRef.current.addTrack(track, stream));

      if (videoRef.current != null) {
        videoRef.current.srcObject = stream;
      }
    } catch (e) {
      console.error("Error accessing media devices:", e);
    }
  };

  const handleMessage = async (message) => {
    const { type, offer, answer, candidate } = message;
    switch (type) {
      case "offer":
        await handleOffer(offer);
        break;
      case "answer":
        await handleAnswer(answer);
        break;
      case "candidate":
        handleCandidate(candidate);
        break;
      default:
        console.error("Invalid message type:", type);
    }
  };

  const handleOffer = async (offer) => {
    try {
      await peerConnectionRef.current.setRemoteDescription(offer);
      const answer = await peerConnectionRef.current.createAnswer();
      socketRef.current.emit("message", { type: "answer", answer });
    } catch (e) {
      console.error("Error handling offer:", e);
    }
  };

  const handleAnswer = async (answer) => {
    try {
      await peerConnectionRef.current.setRemoteDescription(answer);
    } catch (e) {
      console.error("Error handling answer:", e);
    }
  };

  const handleCandidate = (candidate) => {
    try {
      peerConnectionRef.current.addIceCandidate(candidate);
    } catch (error) {
      console.error("Error handling candidate:", error);
    }
  };

  return (
    <div className="web-rtc-compo">
      <video
        // src={srcVideo}
        // type="video/mp4"
        ref={videoRef}
        autoPlay={true}
        controls={true}
        playsInline
        muted
        onCanPlay={() => {
          console.debug("canPlay...");
        }}
      />
    </div>
  );
};

export default WebRTCComponent;
