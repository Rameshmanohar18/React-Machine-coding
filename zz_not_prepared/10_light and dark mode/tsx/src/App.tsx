import './App.css';
import React, { createContext, useState } from 'react';

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

function App() {
  const [theme, setTheme] = useState<string>('dark');

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className='App' id={theme}>
        <div className='switch'>
          <label>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</label>
          <button
            onClick={toggleTheme}
            className={`switch-button ${
              theme === 'dark' ? 'switch-button-on' : ''
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
