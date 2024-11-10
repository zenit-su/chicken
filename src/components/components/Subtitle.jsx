import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const SubtitleContainer = styled.div`
  max-width: 80%;
  font-size: clamp(1.2rem, 2.5vw, 2.5rem);
  color: #fff;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  line-height: 1.5;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    max-width: 90%;
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    max-width: 95%;
    font-size: 1.2rem;
  }
`;

const Word = styled.span`
  margin: 0 8px;
  cursor: pointer;
  display: inline-block;
  visibility: ${(props) =>
    props.visible
      ? "visible"
      : "hidden"}; /* Ensure hidden until slider reveals */
  opacity: ${(props) =>
    props.visible ? 1 : 0}; /* Immediate visibility control */
  transition: opacity 0.3s ease-in-out; /* Ensure smooth appearance without delay */
`;

const SpecialButton = styled(motion.button)`
  padding: 10px 20px;
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.3s;
  margin-top: 20px;

  &:hover {
    background-color: #43a047;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 16px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
`;

const Subtitle = ({
  words,
  sliderValue,
  handleWordClick,
  handleWordHover,
  handleWordUnhover,
  isHoveringLastWord,
  handleSpecialAction,
}) => {
  return (
    <SubtitleContainer>
      {/* Map over each word and control its visibility based on sliderValue */}
      {words.map((word, index) => (
        <Word
          key={index}
          onClick={() => handleWordClick(index)}
          onMouseEnter={() => handleWordHover(index)}
          onMouseLeave={() => handleWordUnhover(index)}
          visible={sliderValue >= index} // Ensure words are immediately visible based on sliderValue
          style={{
            pointerEvents: index === sliderValue + 1 ? "auto" : "none", // Only allow interaction with the next word
          }}
        >
          {word}
        </Word>
      ))}

      {/* AnimatePresence for the SpecialButton */}
      <AnimatePresence>
        {isHoveringLastWord && (
          <SpecialButton
            key="next-button"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            onClick={handleSpecialAction}
          >
            Next Slide
          </SpecialButton>
        )}
      </AnimatePresence>
    </SubtitleContainer>
  );
};

export default Subtitle;
