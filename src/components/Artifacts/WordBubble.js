import React, { useState, useRef } from "react";
import WordBubble from "./WordBubble"; // Import the WordBubble component

function App() {
  const [words] = useState(["This", "is", "a", "sentence"]);
  const [showBubble, setShowBubble] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const bubbleRef = useRef(null);

  const handleWordClick = (index) => {
    setSelectedWord(words[index]);
    setShowBubble(true);
  };

  const playAudio = () => {
    // Implement your audio playback logic here
    console.log(`Playing audio for: ${selectedWord}`);
  };

  return (
    <div>
      {words.map((word, index) => (
        <span
          key={index}
          onClick={() => handleWordClick(index)}
          style={{ cursor: "pointer", margin: "0 5px" }}
        >
          {word}
        </span>
      ))}
      <WordBubble
        show={showBubble}
        word={selectedWord}
        playAudio={playAudio}
        bubbleRef={bubbleRef}
      />
    </div>
  );
}

export default App;
