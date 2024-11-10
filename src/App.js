// src/App.js

import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import MainComponent from "./components/Slide9"; // Adjust the path as needed

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainComponent />
    </ThemeProvider>
  );
}

export default App;
