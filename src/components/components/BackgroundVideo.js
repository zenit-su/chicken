// src/components/BackgroundVideo.jsx

import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function BackgroundVideo({ videoSrc, onLoaded }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleCanPlayThrough = () => {
        onLoaded();
      };
      videoElement.addEventListener("canplaythrough", handleCanPlayThrough);
      return () => {
        videoElement.removeEventListener(
          "canplaythrough",
          handleCanPlayThrough
        );
      };
    }
  }, [onLoaded]);

  return (
    <VideoBackground ref={videoRef} autoPlay loop muted playsInline>
      <source src={videoSrc} type="video/mp4" />
      {/* Add additional source tags for other video formats if needed */}
    </VideoBackground>
  );
}

export default BackgroundVideo;
