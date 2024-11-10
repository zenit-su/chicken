// src/components/Button.js
import React from "react";

function Button({ label, onClick }) {
  return (
    <button
      style={{ padding: "10px 20px", margin: "10px", cursor: "pointer" }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
