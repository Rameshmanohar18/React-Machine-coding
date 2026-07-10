// This component renders a card for a single cocktail in the list.
// Displays image, name, glass, info, and a link to details.

import { Link } from 'react-router-dom';

const CocktailCard = ({ image, name, id, info, glass }) => {
  return (
    <div className='cocktail-card'>
      <div className='img-container'>
        {/* Cocktail thumbnail image. */}
        <img src={image} alt={name} className='img' />
      </div>
      <div className='footer'>
        <h4>{name}</h4>
        <h5>{glass}</h5>
        <p>{info}</p>
        {/* Link to details page: '/cocktail/:id'. */}
        {/* Example: id = '11022' → Link to '/cocktail/11022'. */}
        {/* Input: id (string).
        // Output: Navigates to Cocktail component on click. */}
        <Link to={`/cocktail/${id}`} className='btn'>
          details
        </Link>
      </div>
    </div>
  );
};

export default CocktailCard;
