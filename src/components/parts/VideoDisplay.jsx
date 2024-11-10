// VideoDisplay.jsx
import React from "react";
import OverlayImage from "./OverlayImage"; // Ensure this is your existing overlay image component

function VideoDisplay({ videoSrc, overlayImage, handleBackgroundClick }) {
  return (
    <div
      onClick={handleBackgroundClick}
      style={{
        width: "50%",
        height: "100%",
        cursor: "pointer",
        zIndex: -2,
        borderRadius: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "20px",
          objectFit: "cover",
        }}
      />
      {overlayImage && (
        <OverlayImage
          src={overlayImage}
          alt="Overlay"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: "20px",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}

export default VideoDisplay;
