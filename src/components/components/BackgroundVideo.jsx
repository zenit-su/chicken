// src/components/BackgroundVideo.jsx

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const BackgroundVideo = ({ videoSrc, onLoaded, onError }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleCanPlay = () => {
        onLoaded();
      };

      const handleError = () => {
        onError();
      };

      videoElement.addEventListener("canplaythrough", handleCanPlay);
      videoElement.addEventListener("error", handleError);

      return () => {
        videoElement.removeEventListener("canplaythrough", handleCanPlay);
        videoElement.removeEventListener("error", handleError);
      };
    }
  }, [onLoaded, onError]);

  return (
    <motion.video
      ref={videoRef}
      src={videoSrc}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
      loop
      muted
      autoPlay
      playsInline
    >
      Your browser does not support the video tag.
    </motion.video>
  );
};

BackgroundVideo.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  onLoaded: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default BackgroundVideo;
