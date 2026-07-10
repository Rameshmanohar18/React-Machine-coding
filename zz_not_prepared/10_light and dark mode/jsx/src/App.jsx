import './App.css';
import { createContext, useState } from 'react';

export const ThemeContext = createContext(null);

function App() {
  const [currentTheme, setCurrentTheme] = useState('dark');

  const toggleTheme = () => {
    setCurrentTheme((theme) => (theme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      <div className='App' id={currentTheme}>
        <div className='switch'>
          <label>{currentTheme === 'light' ? 'Light Mode' : 'Dark Mode'}</label>
          <button
            onClick={toggleTheme}
            className={`switch-button ${
              currentTheme === 'dark' ? 'switch-button-on' : ''
            }`}
          >
            <span className='slider'></span>
          </button>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
