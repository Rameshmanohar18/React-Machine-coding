import React, { useState } from 'react';

export default function App() {
  const [selected, setSelected] = useState([]);

  const handleChange = (value) => {
    setSelected((prev) => {
      let updated = [...prev];

      if (updated.includes(value)) {
        // WHEN YOU ARE CLICKING ON THE SELECTED CHECKBOX ITEM
        updated = updated.filter((item) => item !== value);
      } else {
        if (updated.length === 2) {
          updated.shift(); // Removes the first element of the array

          // EXAMPLE SCENARIO:
          // ['good', 'fast'];
          // shift()['fast'];
          // push('cheap')[('fast', 'cheap')];
        }
        // WHEN YOU ARE CLICKING ON THE NON-SELECTED CHECKBOX ITEM (we are simply pushing that value to the array)
        updated.push(value);
      }

      return updated;
    });
  };

  const getTextClass = (value) => {
    if (!selected.includes(value)) return 'option-label';
    if (value === 'good') return 'option-label active-good';
    if (value === 'fast') return 'option-label active-fast';
    if (value === 'cheap') return 'option-label active-cheap';
    return 'option-label';
  };

  const getCheckboxClass = (value) => {
    if (!selected.includes(value)) return 'checkbox';
    if (value === 'good') return 'checkbox checkbox-good';
    if (value === 'fast') return 'checkbox checkbox-fast';
    if (value === 'cheap') return 'checkbox checkbox-cheap';
    return 'checkbox';
  };

  const options = [
    { key: 'good', label: 'GOOD' },
    { key: 'fast', label: 'FAST' },
    { key: 'cheap', label: 'CHEAP' },
  ];

  return (
    <div className='container'>
      {options.map((option) => (
        <label key={option.key} className='option-row'>
          <input
            type='checkbox'
            checked={selected.includes(option.key)}
            onChange={() => handleChange(option.key)}
            className={getCheckboxClass(option.key)}
          />
          <span className={getTextClass(option.key)}>{option.label}</span>
        </label>
      ))}
    </div>
  );
}
