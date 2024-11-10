// OverlayImage.jsx
import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const OverlayImage = ({ src, alt, style }) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%", // Match the width of the container (video)
        height: "100%", // Match the height of the container (video)
        objectFit: "cover", // Ensure the image covers the container
        pointerEvents: "none", // Disable interactions
        ...style, // Merge any additional styles
      }}
    />
  );
};

OverlayImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  style: PropTypes.object,
};

OverlayImage.defaultProps = {
  alt: "Overlay Image",
  style: {},
};

export default OverlayImage;
