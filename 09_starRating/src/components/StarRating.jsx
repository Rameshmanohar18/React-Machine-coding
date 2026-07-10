import { useState } from 'react';
import './StarRating.css';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const ratingMessages = ['Awful', 'Poor', 'Fair', 'Good', 'Excellent'];

  const handleClick = (value) => {
    //value ranges from 1 to 5 (index + 1 i.e; 0+1 to 4+1)
    setRating(value);
  };

  const getRatingMessage = (currentRatingValue) => {
    // returns one value from the array of ratingMessages (ex: Poor)
    return ratingMessages[Math.ceil(currentRatingValue) - 1];
  };

  //this function initially runs as per the length of Array.from provided (ex: 5 stars rendered)
  const renderStar = (index) => {
    //false or true for that particular star (Ex: if you are going to click on first star then rating is 1 and index is 0 to 4, in this case only for first star, fullStar returns true because of 1 > 0 that is why we see only one fullStar)
    const fullStar = rating > index;

    return (
      <span
        key={index}
        className={`star ${fullStar ? 'full' : ''} `}
        onClick={() => handleClick(index + 1)}
      >
        {fullStar ? '★' : '☆'}
      </span>
    );
  };

  return (
    <div className='container'>
      <div className='star-rating'>
        {Array.from({ length: 5 }, (_, index) => renderStar(index))}
        <span className='rating-message'>
          <strong>{getRatingMessage(rating)}</strong>
        </span>
      </div>
    </div>
  );
};

export default StarRating;
