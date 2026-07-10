// Step 1: Setup a searchInputValue useState to track what user types in the input
// Step 2: Pass searchInputValue and 500ms delay into useDebounce — it returns debounceSearchValue which only updates after user stops typing for 500ms
// Step 3: useEffect watches debounceSearchValue — fires the search log only when debounced value changes (not on every keystroke)
// Step 4: Input is a controlled component — onChange updates searchInputValue on every keystroke, but the actual search only triggers after 500ms pause

import { useState, useEffect } from 'react';
import useDebounce from './customHooks/useDebounce';

const App = () => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const debounceSearchValue = useDebounce(searchInputValue, 500);

  useEffect(() => {
    if (debounceSearchValue) {
      console.log(`Searching for ${debounceSearchValue}`);
    }
  }, [debounceSearchValue]);

  return (
    <div className='app_container'>
      <input
        type='text'
        onChange={(e) => setSearchInputValue(e.target.value)}
        placeholder='Please search here...'
        value={searchInputValue}
      />
    </div>
  );
};

export default App;
