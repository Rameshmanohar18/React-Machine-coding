import { useState } from 'react';
import './Carousel.css';
import CarouselItem from './CarouselItem';

export const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => setSlide(slide === data.length - 1 ? 0 : slide + 1);
  const prevSlide = () => setSlide(slide === 0 ? data.length - 1 : slide - 1);

  return (
    <div className='carousel'>
      <button className='arrow arrow-left' onClick={prevSlide}>
        ◀️
      </button>
      {data.map((slideItem, index) => {
        return (
          <CarouselItem
            key={slideItem.id} // Assuming each slideItem has a unique 'id'
            imgSrc={slideItem.imgSrc}
            alt={slideItem.alt}
            isActive={slide === index}
          />
        );
      })}

      <button className='arrow arrow-right' onClick={nextSlide}>
        ▶️
      </button>
      <div className='indicators'>
        {data.map((_, idx) => (
          <button
            key={idx}
            className={`indicator ${slide !== idx ? 'indicator-inactive' : ''}`}
            onClick={() => setSlide(idx)}
          ></button>
        ))}
      </div>
    </div>
  );
};

// IF YOU WANT TO SKIP USING data.map --> twice --> then refer to below  👇🏻👇🏻👇🏻👇🏻 working code //

// import { useState } from 'react';
// import './Carousel.css';
// import CarouselItem from './CarouselItem';

// export const Carousel = ({ data }) => {
//   const [slide, setSlide] = useState(0);

//   const nextSlide = () => setSlide(slide === data.length - 1 ? 0 : slide + 1);
//   const prevSlide = () => setSlide(slide === 0 ? data.length - 1 : slide - 1);

//   const slides = [];
//   const indicators = [];

//   data.forEach((slideItem, index) => {
//     slides.push(
//       <CarouselItem
//         key={slideItem.id}
//         imgSrc={slideItem.imgSrc}
//         alt={slideItem.alt}
//         isActive={slide === index}
//       />
//     );
//     indicators.push(
//       <button
//         key={slideItem.id}
//         className={`indicator ${slide !== index ? 'indicator-inactive' : ''}`}
//         onClick={() => setSlide(index)}
//       />
//     );
//   });

//   return (
//     <div className='carousel'>
//       <button className='arrow arrow-left' onClick={prevSlide}>
//         ◀️
//       </button>
//       {slides}
//       <button className='arrow arrow-right' onClick={nextSlide}>
//         ▶️
//       </button>
//       <div className='indicators'>{indicators}</div>
//     </div>
//   );
// };
