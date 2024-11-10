// src/components/StyledComponents.js

import styled from "styled-components";

export const Button = styled.button`
  background-color: #6200ee;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3700b3;
  }

  &:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }
`;

// Add any additional styled components here as needed
