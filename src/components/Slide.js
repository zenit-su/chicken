import React, { useEffect, useState } from "react";
import bg from "./image/bg.webp"; // Importing the background image

function Slide({
  children,
  backgroundColor = "#ffffff",
  backgroundImage = bg,
}) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Function to check if the screen size is small (e.g., less than 768px)
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    // Initial check when component mounts
    checkScreenSize();

    // Event listener to monitor window resizing
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div
      style={{
        backgroundColor,
        backgroundImage: `url(${backgroundImage})`, // Using backgroundImage
        backgroundSize: "cover", // Adjust based on how you want the image to fit
        backgroundPosition: "center", // Adjusts position of the image
        padding: "20px",
        height: "100vh", // Fixed height for both large and small screens
        textAlign: "center",
        overflow: "hidden", // Removes vertical scroll
        display: "flex", // Flexbox to vertically center content
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
      }}
    >
      {children}
    </div>
  );
}

export default Slide;
