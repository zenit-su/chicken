import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material"; // Assuming you're using Material UI

function Play({ sliderValue, sliderMax, setSliderValue, onPlayEnd, audioSrc }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // Reference for the audio element

  useEffect(() => {
    // Initialize the audio element
    audioRef.current = new Audio(audioSrc);

    return () => {
      audioRef.current.pause(); // Clean up audio when component unmounts
      audioRef.current.src = ""; // Optionally clear the source
    };
  }, [audioSrc]); // Update the audio element if the source changes

  useEffect(() => {
    let intervalId;

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });

      intervalId = setInterval(() => {
        setSliderValue((prevValue) => {
          if (prevValue < sliderMax) {
            return prevValue + 1;
          } else {
            clearInterval(intervalId);
            setIsPlaying(false);
            onPlayEnd(); // Callback when the play reaches the end
            return prevValue;
          }
        });
      }, 1000); // Change slider every 1 second (1000 ms)
    } else {
      audioRef.current.pause(); // Pause audio when not playing
      audioRef.current.currentTime = 0; // Reset audio to start
    }

    return () => {
      clearInterval(intervalId); // Clear interval when component unmounts or isPlaying changes
    };
  }, [isPlaying, sliderMax, setSliderValue, onPlayEnd]);

  const handlePlayPause = () => {
    setIsPlaying((prevPlaying) => !prevPlaying); // Toggle between play and pause
  };

  return (
    <Button
      variant="contained"
      color={isPlaying ? "secondary" : "primary"}
      onClick={handlePlayPause}
    >
      {isPlaying ? "Pause" : "Play"}
    </Button>
  );
}

export default Play;
