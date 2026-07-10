import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  const navToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className='nav'>
      <a href='#' className='nav__brand'>
        Home
      </a>
      <ul className={`nav__menu ${isActive ? 'nav__active' : ''}`}>
        {navLinks.map(({ href, label }) => (
          <li className='nav__item' key={href}>
            <a href={href} className='nav__link'>
              {label}
            </a>
          </li>
        ))}
      </ul>
      <div
        onClick={navToggle}
        className={`nav__toggler ${isActive ? 'toggle' : ''}`}
      >
        {/* Achieving HAMBURGER ICON WITH THE HELP OF 3 DIVs */}
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
}

export default Navbar;
