// Step 1: Pass different media query strings into useMediaQuery — each returns a boolean that updates live on screen change
// Step 2: isSmallDevice is true when screen width is below 768px
// Step 3: isLandscape is true when device is in landscape orientation
// Step 4: isRetina is true when device has high resolution display (min-resolution: 2dppx)
// Step 5: Conditionally render different UI elements based on the live media query boolean values

import useMediaQuery from './customHooks/useMediaQuery';

export default function App() {
  const isSmallDevice = useMediaQuery('only screen and (max-width: 768px)');
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const isRetina = useMediaQuery('(min-resolution: 2dppx)');

  return (
    <div>
      {isSmallDevice && <a href='#'>Menu</a>}
      <p>Screen: {isSmallDevice ? 'Mobile' : 'Desktop'}</p>
      <p>Orientation: {isLandscape ? 'Landscape' : 'Portrait'}</p>
      <p>Display: {isRetina ? 'Retina' : 'Standard'}</p>
    </div>
  );
}
