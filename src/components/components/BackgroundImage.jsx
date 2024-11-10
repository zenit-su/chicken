import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

// Styled component for the background image wrapper
const BackgroundImageWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 0;
  background-repeat: no-repeat; /* Ensures the image doesn't repeat */
  background-image: ${(props) => `url(${props.backgroundImage})`};
  cursor: ${(props) => (props.isClickable ? "pointer" : "default")};
  background-color: ${(props) =>
    props.backgroundImage
      ? "transparent"
      : "#000"}; /* Fallback background color */
`;

const BackgroundImage = ({ backgroundImage, isClickable, onClick }) => {
  return (
    <BackgroundImageWrapper
      backgroundImage={backgroundImage}
      isClickable={isClickable}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }} // Smooth fade transition
    />
  );
};

export default BackgroundImage;
