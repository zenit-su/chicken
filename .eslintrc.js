// .eslintrc.js
module.exports = {
  // ...other configurations
  plugins: ["react", "react-hooks"],
  rules: {
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    // ...other rules
  },
};
