# Navbar

---

## App.jsx

- Import and render the `Navbar.jsx` component

```jsx
<Navbar />
```

---

## Navbar.jsx Breakdown

### Step 1: State Management

```js
const [isActive, setIsActive] = useState(false);
```

### Step 2: Toggle Function

```js
const toggleNavbar = () => {
  setIsActive((prev) => !prev);
};
```

### Step 3: Navigation Links Data

```js
const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];
```

### Step 4: JSX Return Structure

```jsx
<nav>
  <a href='#home'>HOME</a>
  <ul className={`nav__menu ${isActive ? 'nav__active' : ''}`}>
    {navLinks.map(({ href, label }) => (
      <li key={href}>
        <a href={href}>{label}</a>
      </li>
    ))}
  </ul>

  <div className='nav__toggler' onClick={toggleNavbar}>
    <div></div>
    <div></div>
    <div></div>
  </div>
</nav>
```

---

## CSS Styling Guide

### Step 1: `nav` tag

```css
/* Step 1: `nav` tag - Styling the main navigation container */
nav {
  display: flex; /* Uses flexbox to arrange child elements (logo and menu) in a row */
  justify-content: space-between; /* Distributes space between the logo and menu, pushing them to opposite ends */
  align-items: center; /* Vertically centers all child elements for consistent alignment */
  padding: 1rem; /* Adds internal spacing around the nav content for better visual presentation */
}
```

### Step 2: `ul.nav__menu`

```css

/* Step 2: `ul.nav__menu` - Styling the unordered list containing navigation links */
.nav__menu {
  display: flex; /* Displays list items in a horizontal row using flexbox */
  gap: 3em; /* Creates a 3em space between each navigation link for clear separation */
  list-style: none; /* Removes default bullet points from the unordered list for a clean look */
  transition: transform 0.3s ease; /* Smoothly animates the transform property over 0.3 seconds for mobile menu sliding */
}
```

### Step 3: `div.nav__toggler`

```css

/* Step 3: `div.nav__toggler` - Styling the hamburger menu icon for mobile view */
.nav__toggler {
  display: none; /* Hides the toggler by default on larger screens where the full menu is visible */
}

.nav__toggler div {
  width: 25px; /* Sets the width of each hamburger line to 25 pixels for a compact icon */
  height: 3px; /* Defines the thickness of each hamburger line for visibility */
  background-color: black; /* Colors the hamburger lines black for contrast against the background */
  margin: 5px 0; /* Adds 5px vertical spacing between the lines to form a distinct hamburger icon */
}
```

### Step 4: Mobile View (Media Query)

```css

/* Step 4: Mobile View (Media Query) - Adjusting styles for screens smaller than 768px */
@media (max-width: 768px) {
  .nav__toggler {
    display: block; /* Shows the hamburger icon on mobile screens to toggle the menu */
    cursor: pointer; /* Changes the cursor to a pointer to indicate the toggler is clickable */
  }

  .nav__menu {
    position: fixed; /* Fixes the menu to the viewport to slide in/out without affecting page layout */
    top: 7vh; /* Positions the menu 7% from the top to account for the nav bar height */
    right: 0; /* Aligns the menu to the right edge of the screen for a slide-in effect */
    height: 93vh; /* Makes the menu occupy the remaining 93% of viewport height */
    width: 50vw; /* Sets the menu width to 50% of the viewport for a balanced mobile menu */
    flex-direction: column; /* Stacks menu items vertically for better mobile usability */
    background-color: white; /* Sets a white background to ensure the menu is visible and distinct */
    transform: translateX(100%); /* Initially hides the menu off-screen to part of the right */
  }

  .nav__menu.nav__active {
    transform: translateX(0%); /* Moves the menu back to its visible position when the active class is applied */
  }
}
```

---

## Summary

| Part           | Logic                                                 |
| -------------- | ----------------------------------------------------- |
| State          | `isActive` toggles mobile menu visibility             |
| Toggle         | Hamburger toggles state                               |
| Responsive Nav | Rendered with map over `navLinks`                     |
| CSS            | `translateX(100%)` for hidden menu, `0%` for active   |
| Media Query    | Enables hamburger and collapses menu on small screens |

- Fully responsive hamburger menu
