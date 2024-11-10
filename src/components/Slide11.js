// SlideWithBackground.jsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styled, { createGlobalStyle } from "styled-components";
import Modal from "react-modal"; // New import for the modal

// Import large and small background images

import bgImage0 from "./image/tiger/hort/0.webp";
import bgImage0Small from "./image/tiger/vert/0.webp";
import bgImage1 from "./image/tiger/hort/1.webp";
import bgImage1Small from "./image/tiger/vert/1.webp";
import bgImage2 from "./image/tiger/hort/2.webp";
import bgImage2Small from "./image/tiger/vert/2.webp";
import bgImage3 from "./image/tiger/hort/3.webp";
import bgImage3Small from "./image/tiger/vert/3.webp";
import bgImage4 from "./image/tiger/hort/4.webp";
import bgImage4Small from "./image/tiger/vert/4.webp";
import bgImage5 from "./image/tiger/hort/5.webp";
import bgImage5Small from "./image/tiger/vert/5.webp";
import bgImage6 from "./image/tiger/hort/6.webp";
import bgImage6Small from "./image/tiger/vert/6.webp";
import bgImage7 from "./image/tiger/hort/7.webp";
import bgImage7Small from "./image/tiger/vert/7.webp";
import bgImage8 from "./image/tiger/hort/8.webp";
import bgImage8Small from "./image/tiger/vert/8.webp";
import bgImage9 from "./image/tiger/hort/9.webp";
import bgImage9Small from "./image/tiger/vert/9.webp";
import bgImage10 from "./image/tiger/hort/10.webp";
import bgImage10Small from "./image/tiger/vert/10.webp";
import bgImage11 from "./image/tiger/hort/11.webp";
import bgImage11Small from "./image/tiger/vert/11.webp";
import bgImage12 from "./image/tiger/hort/12.webp";
import bgImage12Small from "./image/tiger/vert/12.webp";

// Import option images for the modal
import optionImage1 from "./image/options/0.webp"; // Add your actual image paths
import optionImage2 from "./image/options/0j.webp";

// Import Google Fonts
import "@fontsource/open-sans"; // Ensure this package is installed: npm install @fontsource/open-sans

// Combine images and subtitles into a single slides array
const slides = [
  {
    image: bgImage0,
    imageSmall: bgImage0Small,
    subtitle:
      "Once upon a time, in a big, green forest, lived a little tiger cub named Tuffy.",
  },
  {
    image: bgImage1,
    imageSmall: bgImage1Small,
    subtitle:
      "Once upon a time, in a big, green forest, lived a little tiger cub named Tuffy.",
  },
  {
    image: bgImage2,
    imageSmall: bgImage2Small,
    subtitle:
      "He had stripes like sunshine and a tail that swished like a leaf in the wind.",
  },
  {
    image: bgImage3,
    imageSmall: bgImage3Small,
    subtitle: "Tuffy loved to play hide and seek among the tall trees.",
  },
  {
    image: bgImage4,
    imageSmall: bgImage4Small,
    subtitle: "One day, while playing, Tuffy met a playful monkey named Kiki.",
  },
  {
    image: bgImage5,
    imageSmall: bgImage5Small,
    subtitle: "Kiki swung from branch to branch, giggling.",
  },
  {
    image: bgImage6,
    imageSmall: bgImage6Small,
    subtitle: "They became the best of friends and played together every day.",
  },
  {
    image: bgImage7,
    imageSmall: bgImage7Small,
    subtitle:
      "One sunny morning, Tuffy and Kiki decided to climb the biggest tree in the forest.",
  },
  {
    image: bgImage8,
    imageSmall: bgImage8Small,
    subtitle: "It was so tall that it touched the clouds!",
  },
  {
    image: bgImage9,
    imageSmall: bgImage9Small,
    subtitle: "Suddenly, a big, scary noise startled Tuffy.",
  },
  {
    image: bgImage10,
    imageSmall: bgImage10Small,
    subtitle:
      "He looked down and saw a large bird with colorful feathers flying around the tree.",
  },
  {
    image: bgImage11,
    imageSmall: bgImage11Small,
    subtitle: "Kiki told Tuffy that the bird was just playing.",
  },
  {
    image: bgImage12,
    imageSmall: bgImage12Small,
    subtitle:
      "Tuffy took a deep breath and realized that it was nothing to be scared of. He was brave!",
  },
];

// Global Styles to apply the font and remove scroll
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
    margin: 0; /* Reset default margin */
    overflow: hidden; /* Prevent any scroll */
  }
`;

// Styled Components

const SlideContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const BackgroundImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 0; /* Ensure background is at the bottom */
  background-image: ${(props) => `url(${props.backgroundImage})`};
  cursor: ${(props) =>
    props.isClickable ? "pointer" : "default"}; /* Make bgImage0 clickable */
`;

const ContentWrapper = styled.div`
  z-index: 1; /* Ensure content is above the background */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  padding-bottom: 80px; /* Space for slider */
`;

const SubtitleContainer = styled(motion.div)`
  max-width: 80%;
  font-size: clamp(1.2rem, 2.5vw, 2.5rem);
  color: #fff;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  line-height: 1.5; /* Adjust line height for better readability */
  margin-bottom: 20px;

  @media (max-width: 768px) {
    max-width: 90%;
    font-size: 1.5rem; /* Adjust font size for small screens */
  }

  @media (max-width: 480px) {
    max-width: 95%;
    font-size: 1.2rem; /* Adjust font size for very small screens */
  }
`;

const Word = styled(motion.span)`
  margin: 0 8px; /* Space between words */
  cursor: pointer;
  font-family: "Open Sans", sans-serif;
  display: inline-block;
`;

const SpecialButton = styled(motion.button)`
  padding: 10px 20px;
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-family: "Open Sans", sans-serif;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.3s;
  margin-top: 20px;

  &:hover {
    background-color: #43a047;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Adjust font size for small screens */
    padding: 8px 16px; /* Adjust padding for small screens */
  }

  @media (max-width: 480px) {
    font-size: 0.8rem; /* Further adjust for very small screens */
    padding: 6px 12px;
  }
`;

const SliderContainer = styled(motion.div)`
  width: 60%;
  z-index: 1; /* Ensure slider is above background */

  @media (max-width: 1200px) {
    width: 70%;
  }

  @media (max-width: 992px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 95%;
  }
`;

const StyledSlider = styled(Slider)`
  .rc-slider-rail {
    background-color: #ddd;
    height: 8px;
  }

  .rc-slider-track {
    background-color: #82ca9d;
    height: 8px;
  }

  .rc-slider-handle {
    border-color: #fff;
    height: 24px;
    width: 24px;
    margin-top: -8px;
    background-color: #fff;
    transition: background-color 0.3s, border-color 0.3s;
  }

  &:hover .rc-slider-track {
    background-color: #6fbf7f;
  }

  @media (max-width: 768px) {
    .rc-slider-handle {
      height: 20px;
      width: 20px;
      margin-top: -6px;
    }
    .rc-slider-rail,
    .rc-slider-track {
      height: 6px;
    }
  }

  @media (max-width: 480px) {
    .rc-slider-handle {
      height: 16px;
      width: 16px;
      margin-top: -5px;
    }
    .rc-slider-rail,
    .rc-slider-track {
      height: 4px;
    }
  }
`;

const WordCountDisplay = styled.div`
  position: absolute;
  top: 20px;
  transform: translateX(-50%);
  left: 50%;
  background-color: rgba(
    0,
    0,
    0,
    0.5
  ); /* Semi-transparent background for better visibility */
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  font-size: 1.5rem;
  font-family: "Open Sans", sans-serif;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  z-index: 2; /* Ensure word count is above all elements */

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 8px 16px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 6px 12px;
  }
`;

// New styled components for the modal
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalHeader = styled.h2`
  margin-bottom: 20px;
`;

const OptionImagesContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const OptionImage = styled.img`
  width: 100%;
  max-width: 200px;
  margin: 20px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s;

  &:hover {
    border-color: #4caf50;
  }
`;

// Image variants for AnimatePresence
const imageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function SlideWithBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(-1); // Start at -1 to hide all words initially
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHoveringLastWord, setIsHoveringLastWord] = useState(false);
  const [totalWordsRead, setTotalWordsRead] = useState(0); // Persistent counter
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isHovered, setIsHovered] = useState(false); // New hover state

  const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal visibility

  // Preload all images
  useEffect(() => {
    slides.forEach((slide) => {
      const imgLarge = new Image();
      imgLarge.src = slide.image;
      const imgSmall = new Image();
      imgSmall.src = slide.imageSmall;
    });

    // Preload option images
    const optImg1 = new Image();
    optImg1.src = optionImage1;
    const optImg2 = new Image();
    optImg2.src = optionImage2;
  }, []);

  // Handle screen resize with debounce for performance
  useEffect(() => {
    const debounce = (func, delay) => {
      let timer;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func();
        }, delay);
      };
    };

    const handleResize = debounce(() => {
      setIsSmallScreen(window.innerWidth < 768);
    }, 200);

    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get the current slide's image and subtitle
  const { image, imageSmall, subtitle } = slides[currentIndex];
  const words = subtitle.split(" ");
  const isLastWord = (index) => index === words.length - 1;

  // Function to handle word reveal and update word count
  const revealWord = (newValue) => {
    if (isTransitioning) return;

    const wordCount = words.length;

    if (newValue > sliderValue && newValue <= wordCount) {
      const wordsRevealed = newValue - sliderValue;
      setSliderValue(newValue);
      setTotalWordsRead((prevCount) => prevCount + wordsRevealed);

      if (newValue === wordCount) {
        // Automatically advance to the next slide when all words are revealed
        handleNext();
      }
    }
  };

  // Function to handle next slide
  const handleNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    const nextIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(nextIndex);
    setSliderValue(-1);
    // Do NOT reset totalWordsRead to maintain cumulative count

    // Reset hover states
    setIsHoveringLastWord(false);

    // Allow transition after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Match the transition duration
  };

  // Function to handle slider change
  const handleSliderChange = (newValue) => {
    revealWord(newValue);
  };

  // Function to handle word hover (only handling last word)
  const handleWordHover = (index) => {
    if (isLastWord(index)) {
      setIsHoveringLastWord(true);
    }
  };

  // Function to handle word unhover (only handling last word)
  const handleWordUnhover = (index) => {
    if (isLastWord(index)) {
      setIsHoveringLastWord(false);
    }
  };

  // Function to handle word click
  const handleWordClick = (index) => {
    // Allow clicking only the next word
    if (index === sliderValue + 1) {
      revealWord(index + 1);
    }
  };

  // Function to handle Special Action button click
  const handleSpecialAction = () => {
    // Advance to the next slide
    handleNext();
  };

  // New function to handle background image click
  const handleBgImageClick = () => {
    if (currentIndex === 0) {
      setIsModalOpen(true); // Open modal only for bgImage0
    }
  };

  // Function to handle option selection
  const handleOptionClick = (option) => {
    console.log(`Option ${option} selected`);
    // You can add your logic here based on the selected option
    setIsModalOpen(false); // Close the modal after selection
  };

  if (slides.length === 0) {
    return <div>No slides available.</div>;
  }

  return (
    <>
      <GlobalStyle />
      <SlideContainer>
        {/* Background Image with AnimatePresence for smooth transitions */}
        <AnimatePresence mode="wait">
          <BackgroundImage
            key={currentIndex} // Unique key to trigger re-render on slide change
            backgroundImage={isSmallScreen ? imageSmall : image}
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1 }}
            onAnimationComplete={() => setIsTransitioning(false)}
            onClick={handleBgImageClick} // Add click handler
            isClickable={currentIndex === 0} // Make bgImage0 clickable
          />
        </AnimatePresence>

        {/* Display total words revealed */}
        <WordCountDisplay>
          Total Words Revealed: {totalWordsRead}
        </WordCountDisplay>

        {/* Content Wrapper to position subtitle and slider at the bottom */}
        <ContentWrapper
          onMouseEnter={() => !isSmallScreen && setIsHovered(true)}
          onMouseLeave={() => !isSmallScreen && setIsHovered(false)}
        >
          {/* Subtitle */}
          <SubtitleContainer key={currentIndex}>
            {/* Unique key to reset animations */}
            {words.map((word, index) => (
              <Word
                key={`${currentIndex}-${index}`} // Unique key for each word per slide
                onClick={() => handleWordClick(index)}
                onMouseEnter={() => handleWordHover(index)}
                onMouseLeave={() => handleWordUnhover(index)}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: sliderValue >= index ? 1 : 0,
                  color: sliderValue >= index ? "#FFD700" : "#fff",
                  scale: sliderValue === index ? 1.2 : 1,
                }}
                transition={{ duration: 0.5 }}
                style={{
                  pointerEvents: index === sliderValue + 1 ? "auto" : "none",
                }}
              >
                {word}
              </Word>
            ))}

            {/* Special Action Button appears when hovering over the last word */}
            <AnimatePresence>
              {isHoveringLastWord && (
                <SpecialButton
                  key="next-button" // Unique key for the button
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

          {/* Slider */}
          <AnimatePresence>
            {(isHovered || isSmallScreen) && (
              <SliderContainer
                key="slider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <StyledSlider
                  min={-1}
                  max={words.length} // Max value allows advancing to the next slide
                  value={sliderValue}
                  onChange={handleSliderChange}
                  aria-label="Subtitle Progress Slider"
                  role="slider"
                  aria-valuemin={-1}
                  aria-valuemax={words.length}
                  aria-valuenow={sliderValue}
                  aria-valuetext={`Revealed ${sliderValue} words`}
                />
              </SliderContainer>
            )}
          </AnimatePresence>
        </ContentWrapper>
      </SlideContainer>

      {/* Modal for options */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Select an Option"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "600px",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 3, // Ensure the modal overlay is above other elements
          },
        }}
        ariaHideApp={false} // Set to false if you don't have an #app element
      >
        <ModalContent>
          <ModalHeader>Select an Option</ModalHeader>
          <OptionImagesContainer>
            <OptionImage
              src={optionImage1}
              alt="Option 1"
              onClick={() => handleOptionClick(1)}
            />
            <OptionImage
              src={optionImage2}
              alt="Option 2"
              onClick={() => handleOptionClick(2)}
            />
          </OptionImagesContainer>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SlideWithBackground;
