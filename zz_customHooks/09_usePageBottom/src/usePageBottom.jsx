// Step 1: usePageBottom returns isBottom — a boolean that tells if user has scrolled to the bottom of the page
// Step 2: Create an isBottom state initialized to false
// Step 3: Define handleScroll function — grab scrollTop (how much user has scrolled), offsetHeight (total page height), innerHeight (visible window height)
// Step 4: atBottom logic — if scrollTop + innerHeight >= offsetHeight, user has reached the bottom, set isBottom accordingly
// Step 5: Inside useEffect, attach scroll listener to window using handleScroll, cleanup removes it on unmount
// Step 6: Return isBottom so the consumer can react when user hits the bottom of the page

import { useState, useEffect } from 'react';

const usePageBottom = () => {
  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const offsetHeight = document.documentElement.offsetHeight;
    const innerHeight = window.innerHeight;
    const atBottom = scrollTop + innerHeight >= offsetHeight;

    setIsBottom(atBottom);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isBottom;
};

export default usePageBottom;


// `scrollTop` — how far user has scrolled down
// `innerHeight` — height of the visible viewport
// `offsetHeight` — total height of the entire page