import React from 'react';
import './Accordion.css';

interface AccordionProps {
  id: number;
  title: string;
  info: string;
  toggleAccordion: (id: number) => void;
  isActive: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  id,
  title,
  info,
  toggleAccordion,
  isActive,
}) => {
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

export default Accordion;
