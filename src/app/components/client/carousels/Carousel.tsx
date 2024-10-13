import React, { useState } from "react";
import { styled } from "css-template-components/client";

const CarouselContainer = styled(
  "div",
  `
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 500px;
  overflow: hidden;
  margin: 20px auto;
  background-color: #2b2b6e;
`
);

const CarouselInner = styled(
  "div",
  `
  display: flex;
  transition: transform 0.5s ease;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
  width: 100%;
`
);

const CarouselItem = styled(
  "div",
  `
  min-width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d3e0ff;
  border-radius: 15px;
  font-size: 2rem;
  color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`
);

const ArrowButton = styled(
  "button",
  `
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  ${({ direction }) => (direction === "left" ? `left: 10px;` : `right: 10px;`)}

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`
);

export const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <CarouselContainer>
      <ArrowButton direction="left" onClick={handlePrev}>
        &lt;
      </ArrowButton>
      <CarouselInner currentIndex={currentIndex}>
        {items.map((item, index) => (
          <CarouselItem key={index}>{item}</CarouselItem>
        ))}
      </CarouselInner>
      <ArrowButton direction="right" onClick={handleNext}>
        &gt;
      </ArrowButton>
    </CarouselContainer>
  );
};
