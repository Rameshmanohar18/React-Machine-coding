import { useState } from 'react';
import './StarRating.css';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const ratingMessages = ['Awful', 'Poor', 'Fair', 'Good', 'Excellent'];

  /**
   * Example: clicking left half of 3rd star -> handleClick(3, true) -> sets rating to 2.5
   * Example: clicking right half of 3rd star -> handleClick(3, false) -> sets rating to 3
   */
  const handleClick = (value, isHalf = false) => {
    //value ranges from 1 to 5 (index + 1 i.e; 0+1 to 4+1)
    // If isHalf is true, subtract 0.5 from the value
    // Example: value=3, isHalf=true -> rating becomes 2.5
    // Example: value=3, isHalf=false -> rating becomes 3
    const newRating = isHalf ? value - 0.5 : value;
    setRating(newRating);
  };

  const getRatingMessage = (currentRatingValue) => {
    // returns one value from the array of ratingMessages (ex: Poor)
    return ratingMessages[Math.ceil(currentRatingValue) - 1];
  };

  /**
   * Determines if the mouse is on the left half of an element
   * Example: If star width is 40px and mouse is at 15px from left -> returns true
   * Example: If star width is 40px and mouse is at 25px from left -> returns false
   */
  const isLeftHalf = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    return x < rect.width / 2;
  };

  //this function initially runs as per the length of Array.from provided (ex: 5 stars rendered)
  const renderStar = (index) => {
    //false or true for that particular star (Ex: if you are going to hover on first star then hoverRating is 1 and index is 0 to 4, in this case only for first star, fullStar returns true because of 1 > 0 that is why we see only one fullStar)
    const fullStar = rating > index;

    /**
     * Determines if this star should be displayed as half-filled
     * Logic: A star is half-filled when currentRating falls between index and index+1 with a .5 value
     * Example: If currentRating is 2.5 and index is 2, then 2.5 > 2 && 2.5 < 3 -> true (3rd star is half)
     * Example: If currentRating is 2.5 and index is 1, then 2.5 > 1 && 2.5 < 2 -> false (2nd star is full)
     * Example: If currentRating is 2.5 and index is 3, then 2.5 > 3 -> false (4th star is empty)
     */
    const halfStar = rating > index && rating < index + 1;

    /**
     * Handle click with half-star detection
     * Example: User clicks left side of 4th star (index=3) -> isLeftHalf returns true -> calls handleClick(4, true) -> rating becomes 3.5
     */
    const handleStarClick = (event) => {
      const isHalf = isLeftHalf(event);
      handleClick(index + 1, isHalf);
    };

    /**
     * Determine CSS classes for the star
     * - 'star' is always applied
     * - 'full' is added when star is completely filled
     * - 'half' is added when star is half-filled
     */
    const starClasses = `star ${fullStar && !halfStar ? 'full' : ''} ${
      halfStar ? 'half' : ''
    }`;

    return (
      <span key={index} className={starClasses} onClick={handleStarClick}>
        {/* 
          Render logic for different star states:
          - halfStar: Shows a composite of filled (★) and empty (☆) star using absolute positioning
          - fullStar: Shows completely filled star (★)
          - empty: Shows empty star (☆)
          
          For half-star visual:
          We use two overlapping spans - one with ★ clipped to show only left half,
          and one with ☆ to show as the right half background
        */}
        {halfStar ? (
          <span className='star-wrapper'>
            {/* Background empty star */}
            <span className='star-empty'>☆</span>
            {/* Foreground half-filled star (clipped to show only left half) */}
            <span className='star-half-filled'>★</span>
          </span>
        ) : fullStar ? (
          '★'
        ) : (
          '☆'
        )}
      </span>
    );
  };

  return (
    <div className='container'>
      <div className='star-rating-wrapper'>
        <div className='star-rating'>
          {Array.from({ length: 5 }, (_, index) => renderStar(index))}
        </div>
        <span className='rating-message'>
          <strong>{getRatingMessage(rating)}</strong>
        </span>
      </div>
    </div>
  );
};

export default StarRating;


