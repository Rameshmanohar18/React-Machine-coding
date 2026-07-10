import { useState } from 'react';

const MultiSelectDropdown = ({ options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  // PLEASE NOTE THAT ---> event.target.selectedOptions — DOM Property, NOT JUST BECAUSE WE NAME OUR useState variable as selectedOptions

  const handleChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedValues);
    // parent onChange callback to notify about the selected options (updated filters)
    onChange(selectedValues);
  };

  return (
    <select
      multiple
      value={selectedOptions}
      onChange={handleChange}
      className='custom-multi-select'
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default MultiSelectDropdown;
