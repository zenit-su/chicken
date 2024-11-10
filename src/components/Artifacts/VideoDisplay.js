import React from "react";

function VideoDisplay({ videoSrc, onClick }) {
  return (
    <div
      style={{
        width: "50%",
        height: "100%",
        cursor: "pointer",
        zIndex: -2,
        borderRadius: "20px",
      }}
      onClick={onClick}
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
    </div>
  );
}

export default VideoDisplay;
