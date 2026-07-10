import React from "react";

interface CarouselItemProps {
  src: string;
  alt: string;
  isActive?: boolean;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ src, alt, isActive }) => (
  <img
    src={src}
    alt={alt}
    className={`slide ${isActive ? 'slide-active' : ''}`}
  />
);

export default CarouselItem;
