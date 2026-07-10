import React from "react";

const CategoryFilter = ({ categories, onFilterChange }) => {
  return (
    // Dropdown menu that triggers onFilterChange when a new option is selected.
    // Example: User selects 'Sales' → onFilterChange('Sales') updates filter in App.
    // Input: categories (array of strings), onFilterChange (callback function).
    // Output: JSX for a <select> element with category options.
    <select onChange={(e) => onFilterChange(e.target.value)} defaultValue='All'>
      {/* Map over categories to create <option> elements. */}
      {/* Example: categories = ['All', 'Sales', 'Marketing'] → Renders three options. */}
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
