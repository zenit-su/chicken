import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import WordBubble from "./WordBubble"; // Import the WordBubble component

function SentenceDisplay({
  sentences,
  words,
  previousSentences,
  sliderValue,
  hoveredWordIndex,
  pressedWordIndex,
  handleWordClick,
  handleWordHover,
  transparency,
  backgroundImage,
}) {
  const [showBubble, setShowBubble] = useState(false); // State for the bubble
  const bubbleRef = useRef(null); // Reference for the bubble
  const pressedWord = words[pressedWordIndex]; // Get the pressed word

  const playAudio = () => {
    // Your audio playback logic here
    console.log("Playing audio for:", pressedWord);
  };

  return (
    <motion.div
      style={
        {
          // ... (rest of the styling)
        }
      }
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* ... (rest of the sentence rendering) */}
      <p>
        {words.map((word, index) => (
          <span
            key={index}
            // ... (styling)
            onClick={() => {
              handleWordClick(index); // Call handleWordClick
              setShowBubble(true); // Show the bubble when clicked
            }}
            // ... (other event handlers)
          >
            {word}
          </span>
        ))}
      </p>
      <WordBubble // Render the WordBubble component
        show={showBubble}
        word={pressedWord}
        playAudio={playAudio}
        bubbleRef={bubbleRef}
      />
    </motion.div>
  );
}

export default SentenceDisplay;
