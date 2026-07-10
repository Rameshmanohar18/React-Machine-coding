const CarouselItem = ({ imgSrc, alt, isActive }) => {
  return (
    <div>
      <img
        className={`slide ${isActive ? 'slide-active' : ''}`}
        src={imgSrc}
        alt={alt}
      />
    </div>
  );
};

export default CarouselItem;
