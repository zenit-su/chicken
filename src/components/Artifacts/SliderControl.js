import React from "react";
import Slider from "@mui/material/Slider";

function SliderControl({
  sliderValue,
  sliderMax,
  handleSliderChange,
  handleSliderChangeCommitted,
}) {
  return (
    <Slider
      value={sliderValue}
      min={0}
      max={sliderMax}
      step={1}
      onChange={handleSliderChange}
      onChangeCommitted={handleSliderChangeCommitted}
      sx={{
        color: "#1e88e5",
        height: 8,
        "& .MuiSlider-thumb": {
          height: 24,
          width: 24,
          backgroundColor: "#fff",
          border: "2px solid currentColor",
          "&:hover": { boxShadow: "0 0 0 8px rgba(30, 136, 229, 0.16)" },
          "&.Mui-active": { boxShadow: "0 0 0 14px rgba(30, 136, 229, 0.16)" },
        },
      }}
    />
  );
}

export default SliderControl;
