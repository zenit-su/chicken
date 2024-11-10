// src/components/AudioRecorder.js

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "./StyledComponents";
import MicRecorder from "mic-recorder-to-mp3";
import axios from "axios";

// Initialize constants
const BIT_RATE = 128;
const Mp3Recorder = new MicRecorder({ bitRate: BIT_RATE });

const RecorderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const AudioPlayer = styled.audio`
  margin-top: 20px;
  width: 100%;
`;

const RecordingIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  & > div {
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    margin-right: 5px;
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
    }
  }
`;

const TranscriptionBox = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const LoadingIndicator = styled.div`
  margin-top: 20px;
`;

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [mp3Blob, setMp3Blob] = useState(null);
  const [audioURL, setAudioURL] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [transcription, setTranscription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Request microphone access on component mount
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        console.log("Permission Granted");
        setIsBlocked(false);
      })
      .catch(() => {
        console.log("Permission Denied");
        setIsBlocked(true);
      });
  }, []);

  const handleStart = () => {
    if (isBlocked) {
      alert("Microphone access is blocked. Please allow microphone access.");
      return;
    }

    Mp3Recorder.start()
      .then(() => {
        setIsRecording(true);
        setErrorMessage("");
        setTranscription("");
      })
      .catch((e) => {
        console.error("Error starting recording:", e);
        setErrorMessage("Could not start recording. Please try again.");
      });
  };

  const handleStop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        if (blob) {
          const mp3Blob = new Blob(buffer, { type: "audio/mp3" });
          setMp3Blob(mp3Blob);
          setAudioURL(URL.createObjectURL(mp3Blob));
          setIsRecording(false);
          setIsProcessing(false);
        } else {
          setErrorMessage("Recording failed. Please try again.");
          setIsProcessing(false);
        }
      })
      .catch((e) => {
        console.error("Error stopping recording:", e);
        setErrorMessage("An error occurred while processing your recording.");
        setIsProcessing(false);
      });
    setIsRecording(false);
  };

  const handleDownload = () => {
    if (!mp3Blob) return;
    const url = URL.createObjectURL(mp3Blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "recording.mp3";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = async () => {
    if (!mp3Blob) {
      alert("No audio recorded to upload.");
      return;
    }

    setIsUploading(true);
    setErrorMessage("");
    setTranscription("");

    const formData = new FormData();
    formData.append("audio", mp3Blob, "recording.mp3");

    try {
      const response = await axios.post(
        "http://localhost:5000/transcribe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTranscription(response.data.transcription);
    } catch (error) {
      console.error("Error uploading audio:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred while uploading the audio.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  // Cleanup the object URL when the component unmounts or when audioURL changes
  useEffect(() => {
    return () => {
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);

  return (
    <RecorderWrapper>
      <h3>Audio Recorder</h3>
      <Controls>
        {!isRecording ? (
          <Button
            onClick={handleStart}
            disabled={isBlocked}
            aria-label="Start Recording"
          >
            Start Recording
          </Button>
        ) : (
          <>
            <Button onClick={handleStop} aria-label="Stop Recording">
              Stop Recording
            </Button>
            <RecordingIndicator>
              <div></div>
              <span>Recording...</span>
            </RecordingIndicator>
          </>
        )}
        {mp3Blob && (
          <Button onClick={handleDownload} aria-label="Download MP3">
            Download MP3
          </Button>
        )}
        {mp3Blob && (
          <Button
            onClick={handleUpload}
            disabled={isUploading}
            aria-label="Upload and Transcribe"
          >
            {isUploading ? "Uploading..." : "Upload & Transcribe"}
          </Button>
        )}
      </Controls>
      {isUploading && (
        <LoadingIndicator>
          Uploading and transcribing your audio...
        </LoadingIndicator>
      )}
      {audioURL && (
        <AudioPlayer controls src={audioURL}>
          Your browser does not support the audio element.
        </AudioPlayer>
      )}
      {transcription && (
        <TranscriptionBox>
          <h4>Transcription:</h4>
          <p>{transcription}</p>
        </TranscriptionBox>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </RecorderWrapper>
  );
}

export default AudioRecorder;
