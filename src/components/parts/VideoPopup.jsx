// VideoPopup.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function VideoPopup({ showVideoPopup, videoSrc, handleClosePopup }) {
  return (
    <AnimatePresence>
      {showVideoPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleClosePopup}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
              borderRadius: "10px",
              border: "4px solid #1e88e5",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default VideoPopup;
