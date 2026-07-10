// Step 1: useHover returns [ref, isHovering] — ref is attached to any DOM element, isHovering tracks the hover state
// Step 2: Create a ref (to hold the DOM element) and an isHovering state (initially false)
// Step 3: Inside useEffect, grab ref.current into a local variable called element — if element doesn't exist yet, return early
// Step 4: Define two handlers — setYes sets isHovering to true, setNo sets it to false
// Step 5: Attach mouseenter and mouseleave event listeners to the element using the two handlers
// Step 6: Cleanup removes both event listeners when component unmounts
// Step 7: Return [ref, isHovering] so the consumer can attach ref to a DOM element and read hover state

import { useEffect, useRef, useState } from 'react';

const useHover = () => {
  const ref = useRef();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const setYes = () => setIsHovering(true);
    const setNo = () => setIsHovering(false);

    element.addEventListener('mouseenter', setYes);
    element.addEventListener('mouseleave', setNo);

    return () => {
      element.removeEventListener('mouseenter', setYes);
      element.removeEventListener('mouseleave', setNo);
    };
  }, []);
  return [ref, isHovering];
};

export default useHover;
