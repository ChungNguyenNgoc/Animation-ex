import React, { useEffect, useRef } from "react";
import "./style.scss";

const WebRTCComponent = () => {
  const webRTCsrc =
    "wss://hgdc-ios-api.dev.altasoftware.vn/go2rtc/api/ws?src=k/NJLE3RhVnvKvJ30+yq9R5I/DGMyee2Brn2/x+u1tjaOhTSBIC5XXV99tc=&media=video+audio";
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current == null) return;
    async function PeerConnection(media) {
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      const localTracks = [];
      if (/video|audio/.test(media)) {
        const tracks = ["video", "audio"]
          .filter((kind) => media.indexOf(kind) >= 0)
          .map(
            (kind) =>
              pc.addTransceiver(kind, { direction: "recvonly" }).receiver.track,
          );
        localTracks.push(...tracks);
      }
      if (videoRef.current != null) {
        videoRef.current.srcObject = new MediaStream(localTracks);
      }

      return pc;
    }

    async function connect(medi) {
      console.debug("loading....");
      const pc = await PeerConnection(media);
      const ws = new WebSocket(webRTCsrc);

      ws.addEventListener("open", () => {
        pc.addEventListener("icecandidate", (ev) => {
          if (!ev.candidate) return;
          const msg = {
            type: "webrtc/candidate",
            value: ev.candidate.candidate,
          };
          ws.send(JSON.stringify(msg));
        });

        pc.createOffer()
          .then((offer) => pc.setLocalDescription(offer))
          .then(() => {
            const msg = {
              type: "webrtc/offer",
              value: pc.localDescription?.sdp,
            };
            ws.send(JSON.stringify(msg));
          });
      });

      ws.addEventListener("message", (ev) => {
        const msg = JSON.parse(ev.data);
        if (msg.type === "webrtc/candidate") {
          pc.addIceCandidate({ candidate: msg.value, sdpMid: "0" });
        } else if (msg.type === "webrtc/answer") {
          pc.setRemoteDescription({ type: "answer", sdp: msg.value });
        }
      });
    }

    const media = new URLSearchParams(webRTCsrc).get("media");
    connect(media || "video+audio");
  }, [videoRef.current]);

  return (
    <div className="web-rtc-compo">
      <video
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
