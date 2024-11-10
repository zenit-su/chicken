// SentenceDisplay.jsx
import React, { useState } from "react";

function SentenceDisplay({
  words,
  hoveredWordIndex,
  pressedWordIndex,
  handleWordClick,
  sliderValue,
  backgroundImage,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className="sentence-container"
      style={{
        width: "90%",
        maxHeight: "50vh",
        textAlign: "center",
        fontSize: "1.5rem",
        lineHeight: "2.5rem",
        padding: "2vh 3vw", // Responsive padding
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#333", // Fallback background color
        border: "4px solid #ffffff",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
        marginBottom: "20px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <p style={{ wordWrap: "break-word" }}>
        {" "}
        {/* Ensure long words wrap properly */}
        {words.map((word, index) => (
          <span
            key={index}
            style={{
              color:
                pressedWordIndex === index
                  ? "#ff5722"
                  : index === sliderValue
                  ? "#1e88e5"
                  : hoveredIndex === index
                  ? "#ffeb3b"
                  : "#ffffff",
              fontWeight:
                pressedWordIndex === index ||
                index === sliderValue ||
                hoveredIndex === index
                  ? "bold"
                  : "normal",
              margin: "0 5px",
              cursor: "pointer",
              position: "relative",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={(e) => handleWordClick(index, e)}
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
}

export default SentenceDisplay;
