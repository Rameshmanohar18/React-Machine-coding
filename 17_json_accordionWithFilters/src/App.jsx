// Make a fetch request to https://okrcentral.github.io/sample-okrs/db.json
// Any object without parent_object_id is an parent --> Consider as a parent
// Any object with parent_objective_id is a Key Result --> (Consider as a child). So this has to be rendered below its parent in the hierarchy .
// parent_objective_id is the ID of the parent object (id)
// I see for every category click, we are fetching the API call (db.json)

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import './App.css';
import CategoryFilter from './components/CategoryFilter';

function App() {
  // State to store processed OKR data (objectives with keyResults and visibility).
  // Example: data = [{ id: 'O1', title: 'Increase Sales', keyResults: [...], visible: true }, ...]
  // Input: None initially, updated by processData after API fetch.
  // Output: Array of parent objectives with nested key results.
  const [data, setData] = useState([]);

  // State to store the full unfiltered API response.
  // Example: rawData = [{ id: 'O1', title: 'Increase Sales', category: 'Sales', ... }, ...]
  // Input: Set once on mount from API fetch.
  // Output: Used as source of truth for in-memory filtering — avoids re-fetching on filter change.
  const [rawData, setRawData] = useState([]);

  // State for the current filter category (e.g., 'All', 'Sales', 'Marketing').
  // Example: filter = 'Sales' means only Sales category OKRs are shown.
  // Input: String from CategoryFilter component.
  // Output: Updates displayed data based on selected category.
  const [filter, setFilter] = useState('All');

  // State to store unique categories for the filter dropdown.
  // Example: categories = ['All', 'Sales', 'Marketing', 'Engineering']
  // Input: Extracted from API response.
  // Output: Used to populate CategoryFilter dropdown.
  const [categories, setCategories] = useState([]);

  // Effect hook to fetch OKR data ONCE on mount.
  // Note: Empty dependency array ensures this runs only once — no re-fetching on filter change
  // since the API doesn't accept filter params (?category=Sales etc.), there's no point hitting
  // the API again. Instead, rawData holds the full dataset and filtering is done in memory.
  useEffect(() => {
    // Fetch OKR data from the specified API endpoint.
    // Example: GET request to 'https://okrcentral.github.io/sample-okrs/db.json'
    // Input: None.
    // Output: JSON response like { data: [{ id, title, category, parent_objective_id }, ...] }
    fetch('https://okrcentral.github.io/sample-okrs/db.json')
      .then((response) => response.json())
      .then((json) => {
        // Extract unique categories from API data using Set for deduplication.
        // Example: json.data = [{ category: 'Sales' }, { category: 'Sales' }, { category: 'Marketing' }]
        // Output: uniqueCategories = ['All', 'Sales', 'Marketing']
        const uniqueCategories = new Set(
          json.data.map((item) => item.category)
        );

        // Update categories state with 'All' and unique categories.
        setCategories(['All', ...Array.from(uniqueCategories)]);

        // Store the full raw API response — this is the single source of truth.
        // processData will run separately via its own useEffect when rawData or filter changes.
        setRawData(json.data);
      })
      .catch((error) => {
        // Handle fetch errors (e.g., network issues).
        console.error('Error fetching OKR data:', error);
      });
  }, []); // <-- empty dependency array, runs only once on mount

  // Effect hook to re-process data in memory whenever filter or rawData changes.
  // No API call here — just filtering and restructuring the already-fetched rawData.
  // Example: filter changes from 'All' to 'Sales' → processData runs on rawData in memory.
  // Input: filter (string), rawData (array).
  // Output: Updates data state with filtered + processed objectives.
  useEffect(() => {
    if (rawData.length > 0) {
      setData(processData(rawData));
    }
  }, [filter, rawData]);

  // Handler for category filter changes from CategoryFilter component.
  // Example: User selects 'Marketing' in dropdown → filter = 'Marketing'.
  // Input: newFilter (string) from CategoryFilter.
  // Output: Updates filter state, triggering the second useEffect to re-process data in memory.
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Adds keyResults (children) and visible properties to each parent objective.
  // Input: data (array of OKR objects from API).
  // Output: Array of parent objectives with keyResults and visible fields.
  // This function tries to mutate the existing api response to include extra 2 fields (keyResults, visible)
  const processData = (data) => {
    // filteredData holds all the initial api response data (before mutation)
    let filteredData = data;

    if (filter !== 'All') {
      // if filter is anything apart from All (which is default), we are filtering out the data with only that category (Ex: Sales is the only filteredData for category sales)
      filteredData = data.filter((item) => item.category === filter);
    }

    // Picking up the objects --> only which are treated as parent (I mean those with no parent_obj_id are considered as parents)
    // Note: From above filtered Sales data itself, now we are again filtering out the objects which are considered as parents.
    const objectives = filteredData.filter(
      (item) => item.parent_objective_id === ''
    );

    // performing forEach on parent objects and forEach parentObj ---> we are adding two extra key value properties,
    objectives.forEach((obj) => {
      // keyResults is the key that we are creating ---> and we are storing all the children by strict checking the (filteredData id === parentObjects id)
      obj.keyResults = filteredData.filter(
        // again we are filtering to store only the filteredValues of the specific children related to parent (not every children)
        (item) => item.parent_objective_id === obj.id
      );
      obj.visible = true; // Keep previously set visibility or set default --> All Parent Child toggled data is visible by default
    });
    return objectives; // has two extra fields in it (keyResults with specific children of the parent, visible: true)
  };

  // Toggles visibility of key results for a specific objective.
  // Example: Clicking toggle icon for objective 'O1' → Changes visible from true to false or vice versa.
  // Input: id (string) of the objective to toggle.
  // Output: Updated data state with toggled visibility.
  const toggleVisibility = (id) => {
    // Map over data and toggle the visible property for the matching objective.
    const newData = data.map((obj) => {
      if (obj.id === id) {
        // Flip the visible flag.
        // Example: obj.visible = true → obj.visible = false
        obj.visible = !obj.visible;
      }
      return obj;
    });
    // Update state with new data.
    setData(newData);
  };

  // Renders a single objective and its key results.
  // Example: Input objective = { id: 'O1', title: 'Increase Sales', keyResults: [{...}], visible: true }
  // Output: JSX for objective header and collapsible key results.
  const renderObjective = (objective, index) => (
    <div key={index} className='objective-container'>
      {/* Objective header with toggle icon, user icon, and title. */}
      <div className='objective-header'>
        {/* Toggle icon to show/hide key results. */}
        <span
          className='toggle-icon'
          onClick={() => toggleVisibility(objective.id)}
        >
          {/* Show chevron down if visible, right if hidden. */}
          {/* Example: visible = true → faChevronDown; visible = false → faChevronRight */}
          {objective.visible ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronRight} />
          )}
        </span>
        {/* User icon for styling. */}
        <FontAwesomeIcon icon={faUser} className='user-icon' />
        {/* Objective title with numbering (e.g., "1. Increase Sales"). */}
        <span className='objective-title'>
          {index + 1}. {objective.title}
        </span>
      </div>
      {/* Render key results only if objective is visible. */}
      {objective.visible && (
        <div className='key-results'>
          {/* Map over key results and render each one. */}
          {objective.keyResults.map((kr, krIndex) => (
            <div key={krIndex} className='key-result'>
              <FontAwesomeIcon icon={faUser} className='user-icon' />
              {/* Key result title (commented code suggests alphabetical prefix). */}
              {/* Example: kr.title = 'Increase revenue by 10%' → Output: "Increase revenue by 10%" */}
              {/* {String.fromCharCode(97 + krIndex)}. {kr.title} */}
              {kr.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className='App'>
      {/* Category filter dropdown to select category. */}
      {/* Example: categories = ['All', 'Sales', 'Marketing'] → Renders dropdown with these options. */}
      <CategoryFilter
        categories={categories}
        onFilterChange={handleFilterChange}
      />
      {/* Render all objectives with their key results. */}
      {/* Example: data = [{ id: 'O1', ... }, { id: 'O2', ... }] → Renders two objective containers. */}
      {data.map(renderObjective)}
    </div>
  );
}

export default App;
