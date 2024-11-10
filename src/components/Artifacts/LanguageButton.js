import React, { useState, useEffect, useRef } from "react";
import Button from "./Button"; // Ensure you import your Button component

function LanguageButton({ language, toggleLanguage, onPrevious, onNext }) {
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef(null); // Create a ref for the settings div

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const handleClickOutside = (event) => {
    if (settingsRef.current && !settingsRef.current.contains(event.target)) {
      setShowSettings(false);
    }
  };

  // Add event listener for clicks outside the settings div
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array to run only once on mount

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        onClick={handleSettingsClick}
        style={{
          padding: "8px",
          backgroundColor: "#eee", // Light gray background
          border: "1px solid #ccc", // Light gray border
          borderRadius: "4px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 1.5C4.22 1.5 1.5 4.22 1.5 8C1.5 11.78 4.22 14.5 8 14.5C11.78 14.5 14.5 11.78 14.5 8C14.5 4.22 11.78 1.5 8 1.5ZM12 8C12 10.21 10.21 12 8 12C5.79 12 4 10.21 4 8C4 5.79 5.79 4 8 4C10.21 4 12 5.79 12 8ZM8.5 9.5L9.5 8.5L11 10H9V12H7V10H5L6.5 8.5L7.5 9.5H8.5Z"
            stroke="#333"
            strokeWidth="2"
          />
        </svg>
      </button>
      {showSettings && (
        <div
          ref={settingsRef} // Attach the ref to the settings div
          style={{
            marginLeft: "20px", // Add some space between the button and settings
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
            marginBottom: "20px",
          }}
        >
          <Button label="Previous Slide" onClick={onPrevious} />
          <Button label="Next Slide" onClick={onNext} />
          <button
            onClick={toggleLanguage}
            style={{
              padding: "10px 20px",
              backgroundColor: "#1e88e5",
              color: "#ffffff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            {language === "english" ? "Switch to Hindi" : "Switch to English"}
          </button>
        </div>
      )}
    </div>
  );
}

export default LanguageButton;
