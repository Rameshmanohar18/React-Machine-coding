import React, { useState, useCallback } from 'react';
import Accordion from './Accordion';
import data from './data';
import './App.css';

interface DataItem {
  id: number;
  title: string;
  info: string;
}

const App: React.FC = () => {
  const [allowMultipleOpen, setAllowMultipleOpen] = useState(true);
  const [activeAccordions, setActiveAccordions] = useState<Set<number>>(
    new Set()
  );

  const handleCheckboxChange = useCallback(() => {
    setAllowMultipleOpen((prev) => !prev);
  }, []);

  const toggleAccordion = useCallback(
    (id: number) => {
      setActiveAccordions((prev) => {
        const updatedActiveAccordions = new Set(prev);
        if (updatedActiveAccordions.has(id)) {
          updatedActiveAccordions.delete(id);
        } else {
          if (!allowMultipleOpen) {
            updatedActiveAccordions.clear();
          }
          updatedActiveAccordions.add(id);
        }
        return updatedActiveAccordions;
      });
    },
    [allowMultipleOpen]
  );

  return (
    <div className='app-container'>
      <div className='checkboxContainer'>
        <label className='checkboxLabel' htmlFor='multiple-open'>
          Allow multiple accordions open?
        </label>
        <input
          type='checkbox'
          id='multiple-open'
          checked={allowMultipleOpen}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className='content-info'>
        {data.map((item: DataItem) => (
          <Accordion
            key={item.id}
            isActive={activeAccordions.has(item.id)}
            toggleAccordion={toggleAccordion}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
