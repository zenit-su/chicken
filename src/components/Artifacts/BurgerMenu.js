import React from "react";
import { motion } from "framer-motion";

function BurgerMenu({
  toggleMenu,
  menuVisible,
  wordsReadCount,
  newWordsCount,
}) {
  return (
    <motion.div
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        zIndex: 6,
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {/* Burger Icon */}
      <motion.div
        onClick={toggleMenu}
        style={{
          cursor: "pointer",
          backgroundColor: "#1c1c1e",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
        }}
        aria-expanded={menuVisible} // Accessibility improvement
      >
        <span style={{ color: "#fff", fontSize: "1.5rem" }}>☰</span>
      </motion.div>

      {/* Menu Visibility */}
      {menuVisible && (
        <>
          {/* Words Read Count */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: "#1c1c1e",
              color: "#ffffff",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
              border: "2px solid #333",
              textAlign: "center",
              width: "150px",
            }}
          >
            <p style={{ fontWeight: "bold", margin: "0" }}>Words Read:</p>
            <p style={{ fontSize: "1.2rem", margin: "5px 0 0" }}>
              {wordsReadCount}
            </p>
          </motion.div>

          {/* New Words Count */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: "#1c1c1e",
              color: "#ffffff",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
              border: "2px solid #333",
              textAlign: "center",
              width: "150px",
            }}
          >
            <p style={{ fontWeight: "bold", margin: "0" }}>New Words:</p>
            <p style={{ fontSize: "1.2rem", margin: "5px 0 0" }}>
              {newWordsCount}
            </p>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

export default BurgerMenu;
