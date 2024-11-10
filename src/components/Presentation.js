import React, { useState, useEffect } from "react";
import Slide9 from "./Slide9";
import Slide10 from "./Slide10";
import Slide11 from "./Slide11";
import Slide12 from "./Slide12"; // Import Slide12

function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0); // State to track the current slide index

  // Array of slides with navigation handlers
  const slides = [
    <Slide9
      key="9"
      onPrevious={() => handleNavigation(-1)}
      onNext={() => handleNavigation(1)}
    />, // Slide9
    <Slide10
      key="10"
      onPrevious={() => handleNavigation(-1)}
      onNext={() => handleNavigation(1)}
    />, // Slide10
    <Slide11
      key="11"
      onPrevious={() => handleNavigation(-1)}
      onNext={() => handleNavigation(1)}
    />, // Slide11
    <Slide12
      key="12"
      onPrevious={() => handleNavigation(-1)}
      onNext={() => handleNavigation(1)}
    />, // Slide12
  ];

  const handleNavigation = (direction) => {
    setCurrentSlide((prevSlide) => {
      const nextSlide = prevSlide + direction;
      // Ensure the slide index stays within bounds
      if (nextSlide < 0) return 0; // Don't go below 0
      if (nextSlide >= slides.length) return slides.length - 1; // Don't go above the last slide
      return nextSlide;
    });
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        handleNavigation(1); // Next slide
      } else if (event.key === "ArrowLeft") {
        handleNavigation(-1); // Previous slide
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {slides[currentSlide]} {/* Render the current slide */}
    </div>
  );
}

export default Presentation;
