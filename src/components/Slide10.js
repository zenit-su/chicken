// src/MainComponent.jsx

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";

// Import components
import BackgroundImage from "./components/BackgroundImage";
import BackgroundVideo from "./components/BackgroundVideo";
import Subtitle from "./components/Subtitle";
import SliderComponent from "./components/SliderComponent";
import ModalComponent from "./components/ModalComponent";
import WordCountDisplay from "./components/WordCountDisplay";
import AudioRecorder from "./components/AudioRecorder";
import Foreground from "./components/Foreground";
import AdditionalForeground from "./components/AdditionalForeground"; // Import the new component

// Import the option images
import optionImage1 from "./image/options/0.webp";
import optionImage2 from "./image/options/0j.webp";
import optionImage3 from "./image/options/video-option.jpg"; // Third option image

// Import slide data
import slidesData from "./components/slidesData"; // Centralized slides data

// Styled components for positioning
const ContentWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 20px;
  z-index: 1; /* Ensures content is layered above background image */
`;

const RecorderContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2; /* Ensure it appears above other elements */
`;

// Styled component for error messages (optional enhancement)
const ErrorMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 8px;
  z-index: 3;
`;

// Define constants
const SMALL_SCREEN_WIDTH = 768;

// Animation variants for background transitions
const backgroundVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Optional: Define translation object if not using a library like i18next
const translations = {
  english: {
    errorLoadingMedia: "Failed to load media.",
    retry: "Retry",
    foreground: "Foreground",
    additionalForeground: "Additional Foreground",
  },
  hindi: {
    errorLoadingMedia: "मीडिया लोड करने में विफल रहा।",
    retry: "पुनः प्रयास करें",
    foreground: "पूर्वभूमि",
    additionalForeground: "अतिरिक्त पूर्वभूमि",
  },
  // Add more languages as needed
};

function MainComponent() {
  // State variables
  const [currentIndex, setCurrentIndex] = useState(0); // Current slide index
  const [sliderValue, setSliderValue] = useState(-1); // Slider value
  const [isHoveringLastWord, setIsHoveringLastWord] = useState(false); // Hover state
  const [totalWordsRead, setTotalWordsRead] = useState(0); // Total words
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined"
      ? window.innerWidth < SMALL_SCREEN_WIDTH
      : false
  ); // Responsive state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility (initially closed)
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("preferredLanguage") || "english"
  ); // Language state
  const [selectedOption, setSelectedOption] = useState(null); // Selected option
  const [slides, setSlides] = useState([]); // Slide data based on language and option
  const [mediaLoaded, setMediaLoaded] = useState(false); // Media load status
  const [mediaSrc, setMediaSrc] = useState(""); // Media source
  const [mediaType, setMediaType] = useState("none"); // "image", "video", or "none"
  const [isSwitching, setIsSwitching] = useState(false); // Slide switching state
  const [isTransitioning, setIsTransitioning] = useState(false); // Transition state
  const [error, setError] = useState(null); // Error state for media loading

  // **New State Variables to Control Video Playback**
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false); // Controls Background Video
  const [shouldPlayForegroundVideo, setShouldPlayForegroundVideo] =
    useState(false); // Controls Foreground Video

  // Reference for the audio element
  const audioRef = useRef(null);

  // Memoize words to prevent unnecessary recalculations
  const words = useMemo(
    () => slides[currentIndex]?.subtitle?.split(" ") || [],
    [slides, currentIndex]
  );

  // Determine current translation based on selectedLanguage
  const currentTranslation =
    translations[selectedLanguage] || translations.english;

  // Preload media when mediaSrc or mediaType changes
  useEffect(() => {
    setError(null); // Reset error state on media change

    let isMounted = true; // To prevent state updates on unmounted components

    if (mediaType === "image") {
      const img = new Image();
      img.src = mediaSrc;
      img.onload = () => {
        if (isMounted) setMediaLoaded(true);
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${mediaSrc}`);
        if (isMounted) {
          setMediaLoaded(false);
          setError(currentTranslation.errorLoadingMedia);
        }
      };
    } else if (mediaType === "video") {
      // For video, we set mediaLoaded to true in BackgroundVideo's onLoaded
      setMediaLoaded(false);
    } else {
      setMediaLoaded(false);
    }

    return () => {
      isMounted = false; // Cleanup flag
    };
  }, [mediaSrc, mediaType, currentTranslation.errorLoadingMedia]);

  // Handle window resize to adjust media source for small screens
  useEffect(() => {
    const handleResize = debounce(() => {
      const smallScreen = window.innerWidth < SMALL_SCREEN_WIDTH;
      if (smallScreen !== isSmallScreen) {
        setIsSmallScreen(smallScreen);
        const currentSlide = slides[currentIndex];
        let newMediaSrc = "";
        let newMediaType = "none";

        if (currentSlide.video) {
          newMediaSrc = currentSlide.video;
          newMediaType = "video";
        } else if (currentSlide.image || currentSlide.imageSmall) {
          newMediaSrc = smallScreen
            ? currentSlide.imageSmall
            : currentSlide.image;
          newMediaType = "image";
        }

        setMediaSrc(newMediaSrc);
        setMediaType(newMediaType);

        // Preload the new media based on the determined type
        if (newMediaType === "image") {
          const img = new Image();
          img.src = newMediaSrc;
          img.onload = () => {
            setMediaLoaded(true);
          };
          img.onerror = () => {
            console.error(`Failed to load image: ${newMediaSrc}`);
            setMediaLoaded(false);
            setError(currentTranslation.errorLoadingMedia);
          };
        } else if (newMediaType === "video") {
          setMediaLoaded(false);
        }
      }
    }, 300); // Debounce delay of 300ms

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, [
    isSmallScreen,
    slides,
    currentIndex,
    currentTranslation.errorLoadingMedia,
  ]);

  // **New useEffect for Random Slide Selection on Mount**
  useEffect(() => {
    // Only run if slides are not already loaded
    if (slides.length === 0 && selectedLanguage) {
      const availableOptions = Object.keys(slidesData[selectedLanguage]).filter(
        (key) => key.startsWith("option")
      );
      if (availableOptions.length > 0) {
        const randomOptionKey =
          availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const optionNumber = parseInt(
          randomOptionKey.replace("option", ""),
          10
        );
        handleOptionClick(optionNumber);
      } else {
        console.warn(
          `No available options found for language: ${selectedLanguage}`
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage, slides.length]); // Run only when selectedLanguage or slides.length changes

  // Function to handle moving to the next slide
  const handleNextSlide = useCallback(() => {
    if (isSwitching || isTransitioning) return;

    setIsSwitching(true);
    setIsTransitioning(true);
    const nextIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;

    // Reset slider and media load status
    setSliderValue(-1);
    setMediaLoaded(false);
    setError(null);

    // Reset playback states
    setShouldPlayVideo(false); // Pause background video
    setShouldPlayForegroundVideo(false); // Pause foreground video

    // Get the next slide and determine media type and source
    const nextSlide = slides[nextIndex];
    let nextMediaSrc = "";
    let nextMediaType = "none";

    if (nextSlide.video) {
      nextMediaSrc = nextSlide.video;
      nextMediaType = "video";
    } else if (nextSlide.image || nextSlide.imageSmall) {
      nextMediaSrc = isSmallScreen ? nextSlide.imageSmall : nextSlide.image;
      nextMediaType = "image";
    }

    setMediaSrc(nextMediaSrc);
    setMediaType(nextMediaType);

    // Preload the next media
    if (nextMediaType === "image") {
      const img = new Image();
      img.src = nextMediaSrc;
      img.onload = () => {
        setMediaLoaded(true);
        setIsTransitioning(false);
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${nextMediaSrc}`);
        setMediaLoaded(false);
        setError(currentTranslation.errorLoadingMedia);
        setIsTransitioning(false);
      };
    } else if (nextMediaType === "video") {
      // For videos, loading is handled in BackgroundVideo component
      setMediaLoaded(false);
    }

    // Update current index after transition
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsSwitching(false);
    }, 500); // Duration matches the animation transition
  }, [
    isSwitching,
    isTransitioning,
    currentIndex,
    slides,
    isSmallScreen,
    currentTranslation.errorLoadingMedia,
  ]);

  // Handle slider changes to reveal words
  const handleSliderChange = useCallback(
    (newValue) => {
      if (isSwitching || isTransitioning) return;

      const wordCount = words.length;
      if (newValue > sliderValue && newValue <= wordCount) {
        // Check if the first word is being revealed
        if (
          currentIndex === 0 &&
          newValue === 0 &&
          slides[currentIndex]?.audio
        ) {
          // Play the audio when the first word "START" is revealed
          if (audioRef.current) {
            audioRef.current.play().catch((error) => {
              console.error("Error playing audio:", error);
            });
          }

          // Trigger background video playback
          setShouldPlayVideo(true);

          // Trigger foreground video playback
          setShouldPlayForegroundVideo(true);
        }

        if (newValue === wordCount) {
          // Update the slider value without counting the last word
          setSliderValue(newValue);

          // Automatically move to the next slide when all words are revealed
          handleNextSlide();
        } else {
          // Calculate the number of words revealed in this step
          const wordsRevealed = newValue - sliderValue;

          // Update the slider value
          setSliderValue(newValue);

          // Update the total words read
          setTotalWordsRead((prev) => prev + wordsRevealed);
        }
      }
    },
    [
      isSwitching,
      isTransitioning,
      sliderValue,
      words.length,
      handleNextSlide,
      currentIndex,
      slides,
    ]
  );

  // Handle word clicks to reveal the next word
  const handleWordClick = useCallback(
    (index) => {
      if (index === sliderValue + 1 && !isSwitching && !isTransitioning) {
        handleSliderChange(index + 1);
      }
    },
    [sliderValue, isSwitching, isTransitioning, handleSliderChange]
  );

  // Handle special action (e.g., clicking on the last word)
  const handleSpecialAction = useCallback(() => {
    handleNextSlide();
  }, [handleNextSlide]);

  // Handle modal option selection
  const handleOptionClick = useCallback(
    (option) => {
      setIsModalOpen(false); // Close the modal after selection
      let selectedSlides;
      if (selectedLanguage && slidesData[selectedLanguage]) {
        selectedSlides = slidesData[selectedLanguage][`option${option}`];
      }

      // Fallback to English Option 1 if slides are not found
      if (!selectedSlides) {
        selectedSlides = slidesData["english"]["option1"];
      }

      setSlides(selectedSlides);
      setCurrentIndex(0);
      setTotalWordsRead(0);
      setSliderValue(-1);
      setError(null);

      // Determine media type and source for the first slide
      const firstSlide = selectedSlides[0];
      let initialMediaSrc = "";
      let initialMediaType = "none";

      if (firstSlide.video) {
        initialMediaSrc = firstSlide.video;
        initialMediaType = "video";
      } else if (firstSlide.image || firstSlide.imageSmall) {
        initialMediaSrc = isSmallScreen
          ? firstSlide.imageSmall
          : firstSlide.image;
        initialMediaType = "image";
      }

      setMediaSrc(initialMediaSrc);
      setMediaType(initialMediaType);

      // Preload the initial media
      if (initialMediaType === "image") {
        const img = new Image();
        img.src = initialMediaSrc;
        img.onload = () => setMediaLoaded(true);
        img.onerror = () => {
          console.error(`Failed to load image: ${initialMediaSrc}`);
          setMediaLoaded(false);
          setError(currentTranslation.errorLoadingMedia);
        };
      } else if (initialMediaType === "video") {
        setMediaLoaded(false);
      }

      // **Reset `shouldPlayVideo` and `shouldPlayForegroundVideo` when a new slide is selected**
      setShouldPlayVideo(false);
      setShouldPlayForegroundVideo(false);
    },
    [
      selectedLanguage,
      isSmallScreen,
      slidesData,
      currentTranslation.errorLoadingMedia,
    ]
  );

  // Handle language change from ModalComponent
  const handleLanguageChange = useCallback((language) => {
    setSelectedLanguage(language);
    localStorage.setItem("preferredLanguage", language); // Persist Language Preference
    // Optionally, reset selected option or slides based on new language
    setSelectedOption(null);
    setIsModalOpen(true); // Reopen modal to select option in the new language
    setSlides([]); // Clear slides until an option is selected
    setCurrentIndex(0);
    setTotalWordsRead(0);
    setSliderValue(-1);
    setError(null);
    setMediaSrc("");
    setMediaType("none");
    setMediaLoaded(false);

    // Reset playback states
    setShouldPlayVideo(false);
    setShouldPlayForegroundVideo(false);
  }, []);

  // **Updated handleModalOpen to open modal only on the first slide**
  const handleModalOpen = useCallback(() => {
    if (currentIndex === 0) {
      setIsModalOpen(true); // Open the modal only when on the first slide
    }
  }, [currentIndex]);

  // **useEffect to control audio playback based on slider value and current slide**
  useEffect(() => {
    if (currentIndex === 0 && slides[0]?.audio) {
      if (sliderValue >= 0) {
        // Play the audio when the first word is revealed
        if (audioRef.current) {
          audioRef.current.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
        }
      } else {
        // Pause and reset the audio if the first word is not yet revealed
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }
    } else {
      // Pause and reset the audio if not on the first slide
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [currentIndex, sliderValue, slides]);

  return (
    <>
      {/* AnimatePresence for smooth transitions */}
      <AnimatePresence mode="wait">
        {mediaSrc && (
          <motion.div
            key={mediaSrc}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={backgroundVariants}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0, // Ensure background is behind other elements
            }}
          >
            {/* Background Image */}
            {mediaType === "image" &&
              // **Conditionally Wrap BackgroundImage with a Button Only on First Slide**
              (currentIndex === 0 ? (
                <button
                  onClick={handleModalOpen} // Open modal on click only for first slide
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer", // Always a pointer since modal should open on click
                    width: "100%",
                    height: "100%",
                  }}
                  aria-label={
                    selectedLanguage === "hindi"
                      ? "पृष्ठभूमि छवि"
                      : "Background Image"
                  }
                >
                  <BackgroundImage backgroundImage={mediaSrc} />
                </button>
              ) : (
                <BackgroundImage backgroundImage={mediaSrc} />
              ))}

            {/* Background Video */}
            {mediaType === "video" &&
              // **Conditionally Wrap BackgroundVideo with a Button Only on First Slide**
              (currentIndex === 0 ? (
                <button
                  onClick={handleModalOpen} // Open modal on click only for first slide
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer", // Always a pointer since modal should open on click
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1, // Places the button above the video
                  }}
                  aria-label={
                    selectedLanguage === "hindi"
                      ? "पृष्ठभूमि वीडियो"
                      : "Background Video"
                  }
                >
                  <BackgroundVideo
                    videoSrc={mediaSrc}
                    shouldPlay={shouldPlayVideo} // Pass the control prop
                    onLoaded={() => {
                      setMediaLoaded(true);
                      setIsTransitioning(false);
                    }}
                    onError={() => {
                      console.error(`Failed to load video: ${mediaSrc}`);
                      setMediaLoaded(false);
                      setError(currentTranslation.errorLoadingMedia);
                      setIsTransitioning(false);
                    }}
                  />
                </button>
              ) : (
                <BackgroundVideo
                  videoSrc={mediaSrc}
                  shouldPlay={false} // Do not play video on other slides
                  onLoaded={() => {
                    setMediaLoaded(true);
                    setIsTransitioning(false);
                  }}
                  onError={() => {
                    console.error(`Failed to load video: ${mediaSrc}`);
                    setMediaLoaded(false);
                    setError(currentTranslation.errorLoadingMedia);
                    setIsTransitioning(false);
                  }}
                />
              ))}

            {/* Render Foreground if present */}
            {slides[currentIndex]?.foreground &&
              // **Conditionally Wrap Foreground with a Button Only on First Slide**
              (currentIndex === 0 ? (
                <button
                  onClick={handleModalOpen} // Open modal on click only for first slide
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 2, // Ensure it appears above the background
                  }}
                  aria-label={
                    selectedLanguage === "hindi" ? "पूर्वभूमि" : "Foreground"
                  }
                >
                  <Foreground
                    foreground={slides[currentIndex].foreground}
                    shouldPlay={shouldPlayForegroundVideo} // Pass the control prop
                  />
                </button>
              ) : (
                <Foreground
                  foreground={slides[currentIndex].foreground}
                  shouldPlay={false} // Do not play foreground video on other slides
                />
              ))}

            {/* Render Additional Foreground if present */}
            {slides[currentIndex]?.additionalForeground &&
              // **Conditionally Wrap AdditionalForeground with a Button Only on First Slide**
              (currentIndex === 0 ? (
                <button
                  onClick={handleModalOpen} // Open modal on click only for first slide
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 3, // Ensure it appears above the Foreground
                  }}
                  aria-label={
                    selectedLanguage === "hindi"
                      ? "अतिरिक्त पूर्वभूमि"
                      : "Additional Foreground"
                  }
                >
                  <AdditionalForeground
                    additionalForeground={
                      slides[currentIndex].additionalForeground
                    }
                  />
                </button>
              ) : (
                <AdditionalForeground
                  additionalForeground={
                    slides[currentIndex].additionalForeground
                  }
                />
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* **Render the Audio Element Conditionally** */}
      {slides[currentIndex]?.audio && (
        <audio
          ref={audioRef}
          src={slides[currentIndex].audio.src}
          type={slides[currentIndex].audio.type}
          style={slides[currentIndex].audio.style}
          controls={false} // Hide controls since playback is managed programmatically
        />
      )}

      {/* Display total words revealed */}
      <WordCountDisplay totalWordsRead={totalWordsRead} />

      {/* Audio Recorder Component */}
      <RecorderContainer>
        <AudioRecorder />
      </RecorderContainer>

      {/* Wrapper for Subtitle and Slider */}
      <ContentWrapper>
        {/* Subtitle Component */}
        <Subtitle
          words={words}
          sliderValue={sliderValue}
          handleWordClick={handleWordClick}
          handleWordHover={(index) =>
            setIsHoveringLastWord(index === words.length - 1)
          }
          handleWordUnhover={() => setIsHoveringLastWord(false)}
          isHoveringLastWord={isHoveringLastWord}
          handleSpecialAction={handleSpecialAction}
        />

        {/* Slider Component */}
        <SliderComponent
          value={sliderValue}
          max={words.length}
          onChange={handleSliderChange}
          disabled={isSwitching || isTransitioning} // Disable during transitions
          style={{ transition: "all 0.5s ease-in-out" }} // Smooth slider transition
        />
      </ContentWrapper>

      {/* Modal Component with three options and language selection */}
      <ModalComponent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        optionImage1={optionImage1}
        optionImage2={optionImage2}
        optionImage3={optionImage3} // Third option
        handleOptionClick={handleOptionClick}
        selectedLanguage={selectedLanguage}
        handleLanguageChange={handleLanguageChange}
      />

      {/* Error Message Display (optional enhancement) */}
      {error && (
        <ErrorMessage>
          <p>{error}</p>
          <button
            onClick={() => {
              // Retry logic based on media type
              if (mediaType === "image") {
                const img = new Image();
                img.src = mediaSrc;
                img.onload = () => {
                  setMediaLoaded(true);
                  setError(null);
                };
                img.onerror = () => {
                  console.error(`Retry failed to load image: ${mediaSrc}`);
                  setError(currentTranslation.errorLoadingMedia);
                };
              } else if (mediaType === "video") {
                setMediaLoaded(false);
                // BackgroundVideo component should handle retrying
                setError(null);
              }
            }}
            aria-label={
              selectedLanguage === "hindi"
                ? "मीडिया लोड करने का पुनः प्रयास करें"
                : "Retry loading media"
            }
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#ffffff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {currentTranslation.retry}
          </button>
        </ErrorMessage>
      )}
    </>
  );
}

// Define PropTypes if necessary (Optional)
MainComponent.propTypes = {
  // Define any props if MainComponent receives them
};

export default MainComponent;
