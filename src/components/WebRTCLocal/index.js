import "./style.scss";
import React, { useEffect, useRef, useState } from "react";

const WebRTCLocal = () => {
  const webcamRef = useRef(null);
  const peerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    (async function initWebcam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          // audio: true,
        });
        webcamRef.current.srcObject = stream;

        const configuration = {
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        };
        peerRef.current = new RTCPeerConnection(configuration);

        console.debug("stream: ", stream.getTracks());

        // Add local stream to peer connection
        stream
          .getTracks()
          .forEach((track) => peerRef.current.addTrack(track, stream));
        console.debug("peerRef.current: ", peerRef.current);
        // Listen for incoming ICE candidates
        peerRef.current.addEventListener("icecandidate", (event) => {
          if (event.candidate) {
            // Send ICE candidate to the remote peer
            // console.debug("Sending ICE candidate:", event.candidate);
          }
        });

        // Listen for incoming stream from remote peer
        peerRef.current.addEventListener("track", (event) => {
          console.debug("Remote stream received:", event.streams[0]);
          // Use the remote stream to display video
        });

        // Create an SDP offer and set it as the local description
        const offer = await peerRef.current.createOffer();
        await peerRef.current.setLocalDescription(offer);

        // Send the SDP offer to the remote peer
        // console.debug("Sending offer:", peerRef.current.localDescription);
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    })();
  }, []);

  const handleDataAvailable = (e) => {
    if (e.data != null && e.data.size != null && e.data.size > 0) {
      setRecordedChunks((prev) => [...prev, e.data]);
    }
  };

  const startRecording = () => {
    const stream = webcamRef.current.srcObject;
    if (stream != null) {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable,
      );
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current != null &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const downloadRecording = () => {
    if (recordedChunks.length === 0) {
      return;
    }

    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recorded-video.webm";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL();
  };

  return (
    <div className="webcam-chat">
      <div className="webcam-chat_wrap-video">
        <video ref={webcamRef} autoPlay playsInline width={960} height={540} />
        <div>
          {!isRecording ? (
            <button onClick={startRecording}>Start Recording</button>
          ) : (
            <button onClick={stopRecording}>Stop Recording</button>
          )}
          <button onClick={downloadRecording} disabled={!recordedChunks.length}>
            Download Recording
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebRTCLocal;
