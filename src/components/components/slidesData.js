// src/components/slidesData.js

// Import English Slides
import slidesEnglish1 from "./slidesEnglish1";
import slidesEnglish2 from "./slidesEnglish2";
import slidesEnglish3 from "./slidesEnglish3";

// Import Hindi Slides
import slidesHindi1 from "./slidesHindi1";
import slidesHindi2 from "./slidesHindi2";
import slidesHindi3 from "./slidesHindi3";

// Define Slides Data
const slidesData = {
  english: {
    option1: slidesEnglish1,
    option2: slidesEnglish2,
    option3: slidesEnglish3,
  },
  hindi: {
    option1: slidesHindi1,
    option2: slidesHindi2,
    option3: slidesHindi3,
  },
  // Add more languages and options as needed
};

export default slidesData;
