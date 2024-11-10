// src/components/AdditionalForeground.jsx

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// Styled component for the wrapper
const AdditionalForegroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Ensures it doesn't interfere with background interactions */
  z-index: 2; /* Adjust as needed to layer above the main foreground */
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Styled component for the image
const AdditionalForegroundImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* Adjust as needed (cover, contain, etc.) */
`;

/**
 * AdditionalForeground Component
 * Renders an additional foreground image if provided.
 *
 * @param {Object} props - Component props
 * @param {Object} props.additionalForeground - Additional foreground data
 * @param {string} props.additionalForeground.image - URL or imported image source
 */
const AdditionalForeground = ({ additionalForeground }) => {
  if (!additionalForeground || !additionalForeground.image) {
    return null; // Render nothing if no image is provided
  }

  return (
    <AdditionalForegroundWrapper>
      <AdditionalForegroundImage
        src={additionalForeground.image}
        alt="Additional Foreground"
      />
    </AdditionalForegroundWrapper>
  );
};

// PropTypes for type checking
AdditionalForeground.propTypes = {
  additionalForeground: PropTypes.shape({
    image: PropTypes.string,
  }),
};

AdditionalForeground.defaultProps = {
  additionalForeground: null,
};

export default AdditionalForeground;
