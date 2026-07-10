// Inside App.jsx, we are maintaining Navbar.jsx component.

// Inside Navbar.jsx, I will start with

// - State ---> Active State logic for Mobile Mode (ex: Show Sidebar/Navbar and hide Sidebar/Navbar)
// - Funcs ---> Toggle Navbar logic for Mobile Mode
// - Static data ---> li (listItem data) with bunch of href and label

// Step 1: Return JSX part, I'll start with HTML Tag <nav></nav>

// Step 2: My nav tag is having anchor tag (single anchor tag) with HOME as BRAND

// Ex: <a href="#home">HOME</a>

// Step 3: I have an un-ordered list (<ul></ul>) and it has bunch of li, (I use map operation for list items)

// Ex:

<ul>
  {navLinks.map(({ href, label }) => (
    <li>
      <a href={href}>{label}</a>
    </li>
  ))}
</ul>;

// Step 4: I will be maintaining a div + onClick logic

// Step 5: The above div will be having 3 divs to achieve HAMBURGER

// <---- END OF JS LOGIC ----> //

// ------------------------------------------------------------------------

// <---- Start OF CSS LOGIC ----> //

// Step 1: for nav tag --> Write the same logic to center a div/content

// Step 2: for ul tag has the className called "nav__menu", as this holds li items, so you must have to write display: flex and put some gap: 3em as mandatory (rest are your choice)

// Step 3: our navToggle div has the className called "nav__toggler", which we will hide using display:none initially

// Step 4: All the divs inside nav__toggler can be targeted with the help of

// Ex: nav__toggler div{}

// To achieve HAMBURGER ICON, we have to put width, height, margin for these

// Step 5: LOGIC FOR MOBILE MODE

// Ex: @media (max-width: 768px){}

// In the mobile Mode, we change the display: none to display:block for "nav__toggler" className

// Inside the @media, for className "nav__menu", I have to make the position: fixed, with some top, right: 0, and height of this (ex: 93vh), width: 50vw, flex-direction:column, and this transform in the translateX direction with 100%

// translateX(0%) means we are showing it ---> that means it is active (Ex: nav__active)

// translateX(100%) means it is non-active or empty string -->  So basically it is hidden in our static class (nav__menu)

// Ex: <ul className={`nav__menu ${isActive ? 'nav__active' : ''}`}>
