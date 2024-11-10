// src/components/slides3.js

// Import main videos for slides
import Video0 from "../video/0.mp4";
import Video1 from "../video/1.mp4";
import Video2 from "../video/2.mp4";
import Video3 from "../video/3.mp4";
import Video4 from "../video/4.mp4";
import Video5 from "../video/5.mp4";
import Video6 from "../video/6.mp4";
import Video7 from "../video/7.mp4";
import Video8 from "../video/8.mp4";
import Video9 from "../video/9.mp4";
import Video10 from "../video/10.mp4";
import Video11 from "../video/11.mp4";

// Import foreground videos and images
import Foreground0VideoWebm from "../video/foreground/1.webm"; // WebM version
import Foreground1 from "../image/foregrounds/1.png";
import Foreground2 from "../image/foregrounds/2.png";
import Foreground3 from "../image/foregrounds/3.png";
import Foreground4 from "../image/foregrounds/4.png";
import Foreground5 from "../image/foregrounds/5.png";
import Foreground6 from "../image/foregrounds/6.png";
import Foreground7 from "../image/foregrounds/7.png";
import Foreground8 from "../image/foregrounds/8.png";
import Foreground9 from "../image/foregrounds/9.png";
import Foreground10 from "../image/foregrounds/10.png";
import Foreground11 from "../image/foregrounds/11.png";

// Import additional foreground images
import AdditionalForegroundImage4 from "../image/additionalForegrounds/4.png";
import AdditionalForegroundImage7 from "../image/additionalForegrounds/7.png";
import AdditionalForegroundImage8 from "../image/additionalForegrounds/8.png";
import AdditionalForegroundImage10 from "../image/additionalForegrounds/10.png";
import AdditionalForegroundImage11 from "../image/additionalForegrounds/11.png";

// Import audio file for the first slide
import IntroAudio from "../Audio/Start.mp3"; // Update the path to match your project structure

// Create an array of slides, each slide containing a video, a subtitle, and optionally a foreground, additionalForeground, and audio
const slides3 = [
  {
    video: Video0,
    subtitle: "START",
    foreground: {
      type: "video",
      sources: [{ src: Foreground0VideoWebm, type: "video/webm" }],
      alt: "Foreground Animation",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
    audio: {
      src: IntroAudio,
      type: "audio/mp3",
      controls: true,
      autoPlay: true,
      loop: false,
      style: {
        position: "absolute",
        bottom: "10px",
        left: "10px",
      },
    },
  },
  {
    video: Video1,
    subtitle:
      "Once upon a time, in a big, green forest, lived a little Tiger cub named Tuffy.",
    foreground: {
      type: "image",
      src: Foreground1,
      alt: "Tuffy the Jaguar Cub",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
  },
  {
    video: Video2,
    subtitle:
      "He had stripes like sunshine and a tail that swished like a leaf in the wind.",
    foreground: {
      type: "image",
      src: Foreground2,
      alt: "Tuffy Exploring",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
  },
  {
    video: Video3,
    subtitle: "He loved to explore the forest and make new friends.",
    foreground: {
      type: "image",
      src: Foreground3,
      alt: "Tuffy Exploring",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
  },
  {
    video: Video4,
    subtitle:
      "One day, while exploring, he found a river that sparkled like diamonds.",
    foreground: {
      type: "image",
      src: Foreground4,
      alt: "Tuffy Exploring",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
    additionalForeground: {
      type: "image",
      src: AdditionalForegroundImage4,
      alt: "Diamond Sparkle Overlay",
      style: {
        position: "absolute",
        top: "20%",
        right: "15%",
        width: "25%",
        height: "auto",
        objectFit: "contain",
      },
    },
  },
  {
    video: Video5,
    subtitle: "At the river, he met a playful monkey named Kiki.",
    foreground: {
      type: "image",
      src: Foreground5,
      alt: "Tuffy Exploring",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
  },
  {
    video: Video6,
    subtitle: "Kiki swung from branch to branch, giggling all the way.",
    foreground: {
      type: "image",
      src: Foreground6,
      alt: "Tuffy Exploring",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
  },
  {
    video: Video7,
    subtitle:
      "One sunny morning, Tuffy and Kiki decided to climb the biggest tree in the forest.",
    foreground: {
      type: "image",
      src: Foreground7,
      alt: "Tuffy Exploring",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
    additionalForeground: {
      type: "image",
      src: AdditionalForegroundImage7,
      alt: "Leaf Overlay",
      style: {
        position: "absolute",
        top: "15%",
        left: "10%",
        width: "15%",
        height: "auto",
        objectFit: "contain",
      },
    },
  },
  {
    video: Video8,
    subtitle: "The tree was so tall that it touched the clouds!",
    foreground: {
      type: "image",
      src: Foreground8,
      alt: "Tuffy Exploring",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
    additionalForeground: {
      type: "image",
      src: AdditionalForegroundImage8,
      alt: "Cloud Overlay",
      style: {
        position: "absolute",
        top: "10%",
        right: "25%",
        width: "22%",
        height: "auto",
        objectFit: "contain",
      },
    },
  },
  {
    video: Video9,
    subtitle: "Suddenly, a big, scary noise startled Tuffy.",
    foreground: {
      type: "image",
      src: Foreground9,
      alt: "Tuffy Exploring",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
  },
  {
    video: Video10,
    subtitle:
      "He looked down and saw a large bird with colorful feathers flying around the tree.",
    foreground: {
      type: "image",
      src: Foreground10,
      alt: "Tuffy Exploring",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
    additionalForeground: {
      type: "image",
      src: AdditionalForegroundImage10,
      alt: "Colorful Feathers Overlay",
      style: {
        position: "absolute",
        bottom: "20%",
        left: "30%",
        width: "20%",
        height: "auto",
        objectFit: "contain",
      },
    },
  },
  {
    video: Video11,
    subtitle: "Kiki told Tuffy that the bird was just playing.",
    foreground: {
      type: "image",
      src: Foreground11,
      alt: "Tuffy Exploring",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
    additionalForeground: {
      type: "image",
      src: AdditionalForegroundImage11,
      alt: "Leaf Overlay",
      style: {
        position: "absolute",
        top: "15%",
        left: "10%",
        width: "15%",
        height: "auto",
        objectFit: "contain",
      },
    },
  },
];

export default slides3;
