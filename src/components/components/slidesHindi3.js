// src/components/slidesHindi3.jsx

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

// Import foreground images
import Foreground0 from "../image/foregrounds/0.png";
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
import AdditionalForegroundImage6 from "../image/additionalForegrounds/6.png";
import AdditionalForegroundImage7 from "../image/additionalForegrounds/7.png";
import AdditionalForegroundImage8 from "../image/additionalForegrounds/8.png";
import AdditionalForegroundImage10 from "../image/additionalForegrounds/10.png";
import AdditionalForegroundImage11 from "../image/additionalForegrounds/11.png";
// Import more additional foreground images as needed

// Create an array of slides, each slide containing a video, a subtitle, and optionally a foreground and additionalForeground
const slidesHindi3 = [
  {
    video: Video0,
    subtitle: "शुरू",
    foreground: {
      type: "image",
      src: Foreground0,
      alt: "जगुआर बच्चा टफी",
      style: {
        position: "absolute",
        top: 0, // Positioning to cover the video
        left: 0,
        width: "100%", // Match video size
        height: "100%",
        objectFit: "cover", // Adjust based on desired overlay effect
      },
    },
  },
  {
    video: Video1,
    subtitle:
      "एक समय की बात है, एक बड़े, हरे जंगल में, टफी नाम का एक छोटा जगुआर बच्चा रहता था।",
    foreground: {
      type: "image",
      src: Foreground1,
      alt: "जगुआर बच्चा टफी",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
    // No additionalForeground for this slide
  },
  {
    video: Video2,
    subtitle:
      "उसके धारीयां सूरज की किरणों जैसी थीं और उसकी पूँछ पत्ते की तरह हवा में लहराती थी।",
    foreground: {
      type: "image",
      src: Foreground2,
      alt: "टफी की धारी",
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
    subtitle: "वह जंगल की खोज करने और नए दोस्त बनाने का बहुत शौक रखता था।",
    foreground: {
      type: "image",
      src: Foreground3,
      alt: "टफी जंगल की खोज",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
    // No additionalForeground for this slide
  },
  {
    video: Video4,
    subtitle: "एक दिन, खोज करते समय, उसने एक नदी पाई जो हीरों की तरह चमकती थी।",
    foreground: {
      type: "image",
      src: Foreground4,
      alt: "चमकती नदी",
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
      image: AdditionalForegroundImage4,
      alt: "हीरा चमकना ओवरले",
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
    subtitle: "नदी पर, उसने किकी नाम के एक चंचल बंदर से मुलाकात की।",
    foreground: {
      type: "image",
      src: Foreground5,
      alt: "चंचल बंदर किकी",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
    // No additionalForeground for this slide
  },
  {
    video: Video6,
    subtitle: "किकी शाखा से शाखा पर झूलते हुए हँसता रहता था।",
    foreground: {
      type: "image",
      src: Foreground6,
      alt: "किकी झूलते हुए",
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
      image: AdditionalForegroundImage6,
      alt: "हँसी ओवरले",
      style: {
        position: "absolute",
        bottom: "15%",
        left: "20%",
        width: "18%",
        height: "auto",
        objectFit: "contain",
      },
    },
  },
  {
    video: Video7,
    subtitle:
      "एक धूप भरी सुबह, टफी और किकी ने जंगल के सबसे बड़े पेड़ पर चढ़ने का फैसला किया।",
    foreground: {
      type: "image",
      src: Foreground7,
      alt: "बड़े पेड़ पर चढ़ना",
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
      image: AdditionalForegroundImage7,
      alt: "पत्ते का ओवरले",
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
    subtitle: "पेड़ इतना ऊँचा था कि यह बादलों को छूता था!",
    foreground: {
      type: "image",
      src: Foreground8,
      alt: "ऊँचा पेड़",
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
      image: AdditionalForegroundImage8,
      alt: "बादल ओवरले",
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
    subtitle: "अचानक, एक बड़ा, डरावना शोर ने टफी को चौंका दिया।",
    foreground: {
      type: "image",
      src: Foreground9,
      alt: "डरावना शोर",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
    // No additionalForeground for this slide
  },
  {
    video: Video10,
    subtitle:
      "उसने नीचे देखा और देखा कि एक बड़ा पक्षी, रंग-बिरंगे पंखों के साथ पेड़ के चारों ओर उड़ रहा है।",
    foreground: {
      type: "image",
      src: Foreground10,
      alt: "रंग-बिरंगा पक्षी",
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
      image: AdditionalForegroundImage10,
      alt: "रंग-बिरंगे पंख ओवरले",
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
    subtitle: "किकी ने टफी को बताया कि पक्षी सिर्फ खेल रहा था।",
    foreground: {
      type: "image",
      src: Foreground11,
      alt: "खेलता पक्षी",
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
      image: AdditionalForegroundImage11,
      alt: "पत्ते का ओवरले",
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
  // Uncomment and add more slides as needed
  //{
  //  video: Video12,
  //  subtitle:
  //    "टफी ने गहरी साँस ली और महसूस किया कि वह बहादुर है, और डरने की कोई बात नहीं थी।",
  //  foreground: {
  //    type: "image",
  //    src: Foreground12,
  //    alt: "टफी बहादुर",
  //    style: {
  //      position: "absolute",
  //      top: 0,
  //      left: 0,
  //      width: "100%",
  //      height: "100%",
  //      objectFit: "cover",
  //    },
  //  },
  //  additionalForeground: {
  //    image: AdditionalForegroundImage12,
  //    alt: "बहादुरी ओवरले",
  //    style: {
  //      position: "absolute",
  //      bottom: "25%",
  //      right: "10%",
  //      width: "25%",
  //      height: "auto",
  //      objectFit: "contain",
  //    },
  //  },
  //},
];

export default slidesHindi3;
