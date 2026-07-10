import React from 'react';
import PropTypes from 'prop-types';
import './Accordion.css';

const Accordion = ({ id, title, info, toggleAccordion, isActive }) => {
  const handleClick = () => {
    toggleAccordion(id);
  };

  return (
    <div className='accordion-container'>
      <div className='toggleInfo'>
        <h2>{title}</h2>
        <button
          className='toggleButton'
          onClick={handleClick}
          aria-expanded={isActive}
        >
          {isActive ? '-' : '+'}
        </button>
      </div>
      <div className={`accordion-content ${isActive ? 'open' : ''}`}>
        <p>{info}</p>
      </div>
    </div>
  );
};

Accordion.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  toggleAccordion: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Accordion;
