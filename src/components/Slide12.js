// SlideWithBackground.jsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styled, { createGlobalStyle } from "styled-components";

// Import background images
import bgImage1 from "./image/1.webp";
import bgImage2 from "./image/2.webp";
import bgImage3 from "./image/3.webp";
import bgImage4 from "./image/4.webp";
import bgImage5 from "./image/5.webp";
import bgImage6 from "./image/6.webp";
import bgImage7 from "./image/7.webp";
import bgImage8 from "./image/8.webp";
import bgImage9 from "./image/9.webp";
import bgImage10 from "./image/10.webp";
import bgImage11 from "./image/11.webp";
import bgImage12 from "./image/12.webp";
import bgImage13 from "./image/13.webp";
import bgImage14 from "./image/14.webp";
import bgImage15 from "./image/15.webp";
import bgImage16 from "./image/16.webp";
import bgImage17 from "./image/17.webp";

// Import Google Fonts
import "@fontsource/open-sans"; // Ensure this package is installed: npm install @fontsource/open-sans

// Combine images and subtitles into a single slides array
const slides = [
  { image: bgImage1, subtitle: "Coco the monkey was very curious." },
  {
    image: bgImage2,
    subtitle: "He loved swinging from branch to branch in his jungle home.",
  },
  {
    image: bgImage3,
    subtitle:
      "One morning, he saw something new – a shiny, bright blue butterfly!",
  },
  {
    image: bgImage4,
    subtitle: "He wanted to catch it, so he decided to follow it.",
  },
  {
    image: bgImage5,
    subtitle:
      "'This will be a big adventure!', Coco thought, as he started swinging through the trees.",
  },
  {
    image: bgImage6,
    subtitle: "As Coco followed the butterfly, he met Ellie the elephant.",
  },
  {
    image: bgImage7,
    subtitle:
      "Ellie had a trunk full of yummy bananas! 'Hello, little monkey!' said Ellie.",
  },
  {
    image: bgImage8,
    subtitle:
      "'Where are you going?' 'I'm following this beautiful blue butterfly,' replied Coco.",
  },
  {
    image: bgImage9,
    subtitle:
      "Ellie smiled. 'I know just where it might be going. Come, I'll take you!'",
  },
  {
    image: bgImage10,
    subtitle: "Ellie walked slowly through the jungle, Coco holding on tight.",
  },
  {
    image: bgImage11,
    subtitle: "They reached a clearing filled with colorful flowers.",
  },
  {
    image: bgImage12,
    subtitle: "The blue butterfly was there, landing on a big, red flower.",
  },
  {
    image: bgImage13,
    subtitle:
      "Coco saw something amazing – a tiny, sparkling waterfall hidden behind the flower! 'Look!' he cried. 'It's a magical waterfall!'",
  },
  {
    image: bgImage14,
    subtitle: "Coco couldn't wait to splash in the waterfall!",
  },
  {
    image: bgImage15,
    subtitle: "He jumped off Ellie's back and ran towards the water.",
  },
  {
    image: bgImage16,
    subtitle: "The water was so cool and refreshing!",
  },
  {
    image: bgImage17,
    subtitle: "Coco had a wonderful time at the waterfall.",
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

// Image variants for AnimatePresence
const imageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function SlideWithBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(-1); // Start at -1
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSlider, setShowSlider] = useState(true);
  const [isHoveringWords, setIsHoveringWords] = useState(false);
  const [isHoveringLastWord, setIsHoveringLastWord] = useState(false);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const [totalWordsRead, setTotalWordsRead] = useState(0);

  // Preload all images
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Compute showSlider based on hover states
  useEffect(() => {
    if (isHoveringWords && !isHoveringSlider) {
      setShowSlider(false);
    } else {
      setShowSlider(true);
    }
  }, [isHoveringWords, isHoveringSlider]);

  // Get the current slide's image and subtitle
  const { image, subtitle } = slides[currentIndex];
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
    setIsHoveringWords(false);
    setIsHoveringLastWord(false);
    setIsHoveringSlider(false);

    // Reset showSlider to true when moving to the next slide
    setShowSlider(true);

    // Allow transition after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Match the transition duration
  };

  // Function to handle slider change
  const handleSliderChange = (newValue) => {
    revealWord(newValue);
  };

  // Function to handle word hover
  const handleWordHover = (index) => {
    if (isLastWord(index)) {
      setIsHoveringLastWord(true);
    }
    setIsHoveringWords(true);
  };

  // Function to handle word unhover
  const handleWordUnhover = (index) => {
    if (isLastWord(index)) {
      setIsHoveringLastWord(false);
    }
    setIsHoveringWords(false);
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
    // For example, you can advance to the next slide
    handleNext();
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
            key={currentIndex}
            style={{ backgroundImage: `url(${image})` }}
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1 }}
            onAnimationComplete={() => setIsTransitioning(false)}
          />
        </AnimatePresence>

        {/* Display total words revealed */}
        <WordCountDisplay>
          Total Words Revealed: {totalWordsRead}
        </WordCountDisplay>

        {/* Content Wrapper to position subtitle and slider at the bottom */}
        <ContentWrapper>
          {/* Subtitle */}
          <SubtitleContainer>
            {words.map((word, index) => (
              <Word
                key={index}
                onClick={() => handleWordClick(index)}
                onMouseEnter={() => handleWordHover(index)}
                onMouseLeave={() => handleWordUnhover(index)}
                animate={{
                  color: sliderValue >= index ? "#FFD700" : "#fff",
                  scale: sliderValue === index ? 1.2 : 1,
                  opacity: sliderValue >= index ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
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
          <SliderContainer
            onMouseEnter={() => setIsHoveringSlider(true)}
            onMouseLeave={() => setIsHoveringSlider(false)}
          >
            {showSlider && (
              <StyledSlider
                min={-1}
                max={words.length} // Max value allows advancing to the next slide
                value={sliderValue}
                onChange={handleSliderChange}
                aria-label="Subtitle Progress Slider"
              />
            )}
          </SliderContainer>
        </ContentWrapper>
      </SlideContainer>
    </>
  );
}

export default SlideWithBackground;
