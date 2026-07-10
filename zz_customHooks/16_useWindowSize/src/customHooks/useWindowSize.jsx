// Step 1: useWindowSize returns { width, height } — tracks live window dimensions on every resize
// Step 2: Create a size state initialized with { width: window.innerWidth, height: window.innerHeight } to capture dimensions on first render
// Step 3: Inside useEffect, define handleResize — updates size state with latest window.innerWidth and window.innerHeight on every resize event
// Step 4: Attach resize listener to window, cleanup removes it on unmount
// Step 5: Return size object { width, height } so consumer can use dimensions for responsive logic

import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

export default useWindowSize;
