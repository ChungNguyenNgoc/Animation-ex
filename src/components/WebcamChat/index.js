import "./style.scss";
import React, { useEffect, useRef, useState } from "react";

function WebcamStream() {
  const webcamRef = useRef(null);
  const peerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  console.debug("recordedChunks: ", recordedChunks);

  useEffect(() => {
    (async function initWebcam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        webcamRef.current.srcObject = stream;

        const configuration = {
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        };
        peerRef.current = new RTCPeerConnection(configuration);

        // Add local stream to peer connection
        stream
          .getTracks()
          .forEach((track) => peerRef.current.addTrack(track, stream));

        // Listen for incoming ICE candidates
        peerRef.current.addEventListener("icecandidate", (event) => {
          if (event.candidate) {
            // Send ICE candidate to the remote peer
            // console.debug("Sending ICE candidate:", event.candidate);
          }
        });

        // Listen for incoming stream from remote peer
        peerRef.current.addEventListener("track", (event) => {
          // console.debug("Remote stream received:", event.streams[0]);
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

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
  };

  const handleDataAvailable = (e) => {
    if (e.data.size > 0) {
      mediaRecorderRef.current.stop();
      setRecordedChunks((prev) => [...prev, e.data]);
    }
  };

  const startRecording = () => {
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.srcObject);
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable,
    );
    mediaRecorderRef.current.start();
  };

  return (
    <div className="webcam-chat">
      <div className="webcam-chat_wrap-video">
        <video ref={webcamRef} autoPlay playsInline width={960} height={540} />
        <div>
          <button onClick={startRecording}>Start Recording</button>
          <button onClick={stopRecording}>Stop Recording</button>
        </div>
      </div>
    </div>
  );
}

export default WebcamStream;
