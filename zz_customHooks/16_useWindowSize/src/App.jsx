// Step 1: Destructure { width, height } from useWindowSize hook
// Step 2: Derive isMobile and isTablet booleans directly from width — no CSS media queries needed
// Step 3: Conditionally render different layouts based on isMobile and isTablet flags
// Step 4: Display raw width and height so the live tracking is clearly visible on resize

import useWindowSize from './customHooks/useWindowSize';

const App = () => {
  const { width, height } = useWindowSize();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  return (
    <div>
      <p>
        Width: {width}px | Height: {height}px
      </p>

      {isMobile && <p>📱 Mobile Layout — width below 768px</p>}
      {isTablet && <p>📟 Tablet Layout — width between 768px and 1024px</p>}
      {isDesktop && <p>🖥️ Desktop Layout — width above 1024px</p>}
    </div>
  );
};

export default App;
