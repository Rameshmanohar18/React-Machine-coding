# Light Mode and Dark Mode

---

## App.jsx (We are maintaining all the code inside App)

### Step 1: JSX Structure with Theming Logic

```jsx
const [currentTheme, setCurrentTheme] = useState('light');

const toggleTheme = () => {
  setCurrentTheme((theme) => (theme === 'dark' ? 'light' : 'dark'));
};

return (
  <div className='App' id={currentTheme}>
    <div>
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
);
```

---

## CSS Styling

### Step 1: Centering the App Container

```css
.App {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

### Step 2: Theme-Specific Background via ID

```css
#light {
  background-color: lightgray;
  color: black;
}

#dark {
  background-color: black;
  color: white;
}
```

### Step 3: Styling the Toggle Button

```css
.switch-button {
  position: relative;
  width: 50px;
  height: 24px;
  background-color: #ccc;
  border-radius: 24px;
  border: none;
  cursor: pointer;
  margin-left: 10px;
}
```

### Step 4: Styling the Slider (Toggle Ball)

```css
.slider {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  top: 2px;
  left: 2px;
  transition: transform 0.3s ease;
}
```

### Step 5: Dark Mode Toggle Effect

```css
.switch-button-on .slider {
  transform: translateX(26px);
}
```

---

## Summary

| Part                | Logic                                                  |
| ------------------- | ------------------------------------------------------ |
| JSX                 | Theme toggle button and label based on `currentTheme`  |
| `id={currentTheme}` | Drives conditional styling in CSS                      |
| Button toggle       | Uses `transform: translateX()` for sliding effect      |
| Styling             | Relative + absolute positioning for smooth transitions |
