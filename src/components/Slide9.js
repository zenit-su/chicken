// src/components/Book.jsx
import React, { useState } from "react";
import "./slide9.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

// Import Font Awesome for Icons (Ensure Font Awesome is installed)
import "@fortawesome/fontawesome-free/css/all.min.css";

const Book = () => {
  // Array of image paths representing book pages (public folder)
  const pages = [
    "/images/Chicken/cover-left.png",
    "/images/Chicken/cover-right.png",
    "/images/Chicken/1.png",
    "/images/Chicken/2.png",
    "/images/Chicken/3.png",
    "/images/Chicken/4.png",
    "/images/Chicken/5.png",
    "/images/Chicken/6.png",
    "/images/Chicken/7.png",
    "/images/Chicken/8.png",
    "/images/Chicken/9.png",
    "/images/Chicken/10.png",
    "/images/Chicken/11.png",
    "/images/Chicken/12.png",
    "/images/Chicken/13.png",
    "/images/Chicken/14.png",
    "/images/Chicken/15.png",
    "/images/Chicken/16.png",
    "/images/Chicken/17.png",
    "/images/Chicken/18.png",
    "/images/Chicken/19.png",
    "/images/Chicken/20.png",
    "/images/Chicken/21.png",
    "/images/Chicken/22.png",
    "/images/Chicken/23.png",
    "/images/Chicken/24.png",
    // Add more pages as needed
  ];

  // State to keep track of the current left page index
  const [currentPage, setCurrentPage] = useState(0);

  // Handler for Next button
  const handleNext = () => {
    if (currentPage + 2 < pages.length) {
      setCurrentPage(currentPage + 2);
    }
  };

  // Handler for Previous button
  const handlePrev = () => {
    if (currentPage - 2 >= 0) {
      setCurrentPage(currentPage - 2);
    }
  };

  // Determine if Next/Prev buttons should be disabled
  const isNextDisabled = currentPage + 2 >= pages.length;
  const isPrevDisabled = currentPage === 0;

  // Fallback image path
  const fallbackImage = "/images/Chicken/fallback.png";

  // Image Error Handler
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = fallbackImage;
  };

  // Unique keys for TransitionGroup
  const leftPageKey = `left-${currentPage}`;
  const rightPageKey = `right-${currentPage + 1}`;

  return (
    <div className="book-container">
      <div className="book">
        {/* Pages Display */}
        <div className="pages">
          {/* Left Page */}
          <TransitionGroup component={null}>
            <CSSTransition key={leftPageKey} timeout={300} classNames="fade">
              <div className="page left-page">
                <img
                  src={pages[currentPage]}
                  alt={`Page ${currentPage + 1}`}
                  onError={handleImageError}
                />
              </div>
            </CSSTransition>
          </TransitionGroup>

          {/* Right Page */}
          {currentPage + 1 < pages.length ? (
            <TransitionGroup component={null}>
              <CSSTransition key={rightPageKey} timeout={300} classNames="fade">
                <div className="page right-page">
                  <img
                    src={pages[currentPage + 1]}
                    alt={`Page ${currentPage + 2}`}
                    onError={handleImageError}
                  />
                </div>
              </CSSTransition>
            </TransitionGroup>
          ) : (
            <div className="page right-page empty-page"></div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="nav-buttons">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            disabled={isPrevDisabled}
            className={`nav-button prev-button ${
              isPrevDisabled ? "disabled" : ""
            }`}
            aria-label="Previous Page"
          >
            <i className="fas fa-arrow-left"></i> Previous
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={isNextDisabled}
            className={`nav-button next-button ${
              isNextDisabled ? "disabled" : ""
            }`}
            aria-label="Next Page"
          >
            Next <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
