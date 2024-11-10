// src/components/SliderComponent.jsx

import React, { memo } from "react";
import Slider from "rc-slider";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import "rc-slider/assets/index.css";

// Styled component for the slider container with responsive design and framer-motion animations
const SliderContainer = styled.div`
  width: 60%;
  margin: 20px 0;

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 90%;
  }

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
      pointer-events: none;
    `}
`;

// Styled rc-slider with custom rail, track, and handle
const StyledSlider = styled(Slider)`
  .rc-slider-rail {
    background-color: ${({ theme }) => theme.colors.sliderRail || "#ddd"};
    height: 8px;
    border-radius: 4px;
  }

  .rc-slider-track {
    background: ${({ theme }) =>
      theme.colors.sliderTrackGradient ||
      "linear-gradient(90deg, #82ca9d, #6fbf7f)"};
    height: 8px;
    border-radius: 4px;
  }

  .rc-slider-handle {
    border-color: ${({ theme }) => theme.colors.sliderHandleBorder || "#fff"};
    height: 24px;
    width: 24px;
    margin-top: -8px;
    background-color: ${({ theme }) => theme.colors.sliderHandleBg || "#fff"};
    transition: background-color 0.3s, border-color 0.3s, transform 0.2s;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

    &:focus {
      box-shadow: 0 0 0 5px rgba(130, 202, 157, 0.5);
      outline: none;
    }

    &:disabled {
      background-color: #ccc;
      border-color: #999;
      cursor: not-allowed;
    }
  }

  &:hover .rc-slider-track {
    background-color: ${({ theme }) =>
      theme.colors.sliderTrackHover || "#6fbf7f"};
  }
`;

// Custom handle without tooltip for simplicity
const Handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return <Slider.Handle value={value} {...restProps} />;
};

/**
 * SliderComponent
 *
 * A styled and animated slider component using rc-slider and styled-components.
 *
 * Props:
 * - value (number): Current value of the slider.
 * - max (number): Maximum value of the slider.
 * - onChange (function): Handler for value changes.
 * - disabled (boolean): If true, the slider is disabled.
 */
const SliderComponent = ({ value, max, onChange, disabled = false }) => {
  return (
    <SliderContainer disabled={disabled}>
      <StyledSlider
        min={-1}
        max={max}
        value={value}
        onChange={onChange}
        handle={Handle}
        aria-label="Subtitle Progress Slider"
        aria-valuemin={-1}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`Progress: ${value} of ${max}`}
        role="slider"
        disabled={disabled}
        step={1}
        marks={{
          "-1": "Start",
          0: "0",
          [max]: `${max}`,
        }}
      />
    </SliderContainer>
  );
};

// Define prop types for the component
SliderComponent.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

// Memoize the component to prevent unnecessary re-renders
export default memo(SliderComponent);
