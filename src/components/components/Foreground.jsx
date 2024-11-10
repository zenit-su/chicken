// src/components/Foreground.jsx

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Foreground = ({ foreground, shouldPlay }) => {
  // **1. Call Hooks unconditionally at the top**
  const videoRef = useRef(null);

  // **2. Destructure foreground properties**
  const {
    type,
    sources, // Array of video sources
    src, // Single image or fallback video source
    alt,
    style,
    component: ForegroundComponent,
    props: componentProps,
  } = foreground || {}; // Provide a default empty object to prevent destructuring errors

  // **3. Use useEffect unconditionally**
  useEffect(() => {
    if (type === "video" && videoRef.current) {
      if (shouldPlay) {
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [shouldPlay, type]);

  // **4. Early return after Hooks**
  if (!foreground) return null;

  // **5. Render based on type using switch-case for clarity**
  switch (type) {
    case "image":
      return (
        <motion.img
          src={src}
          alt={alt || "Foreground Image"}
          style={{
            ...style,
            zIndex: 2,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      );

    case "video":
      return (
        <motion.video
          ref={videoRef}
          style={{
            ...style,
            zIndex: 2,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          loop
          muted
          // Removed autoPlay and controls to manage via shouldPlay prop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {sources && sources.length > 0 ? (
            sources.map((source, index) => (
              <source key={index} src={source.src} type={source.type} />
            ))
          ) : (
            <source src={src} type="video/webm" /> // Fallback source
          )}
          Your browser does not support the video tag.
        </motion.video>
      );

    case "component":
      if (ForegroundComponent) {
        return (
          <motion.div
            style={{ ...style, zIndex: 2, width: "100%", height: "100%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ForegroundComponent {...componentProps} />
          </motion.div>
        );
      }
      return null;

    default:
      return null;
  }
};

Foreground.propTypes = {
  foreground: PropTypes.shape({
    type: PropTypes.string.isRequired,
    sources: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      })
    ),
    src: PropTypes.string, // For images or fallback video
    alt: PropTypes.string,
    style: PropTypes.object,
    component: PropTypes.elementType,
    props: PropTypes.object,
  }),
  shouldPlay: PropTypes.bool,
};

Foreground.defaultProps = {
  shouldPlay: false,
};

export default Foreground;
