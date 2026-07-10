// Step 1: useFocus returns [ref, focussed] — ref is attached to any DOM element, focussed tracks the focus state
// Step 2: Create a ref (to hold the DOM element) and a focussed state (initially false)
// Step 3: Inside useEffect, grab ref.current into a local variable — if element doesn't exist, return early
// Step 4: Define two handlers — onFocus sets focussed to true, onBlur sets it to false
// Step 5: Attach focus and blur event listeners to the element using the two handlers
// Step 6: Cleanup removes both event listeners when component unmounts
// Step 7: Return [ref, focussed] so the consumer can attach ref to a DOM element and read focus state

import { useEffect, useRef, useState } from 'react';

const useFocus = () => {
  const ref = useRef();
  const [focussed, setFocussed] = useState(false);

  useEffect(() => {
    const currentElement = ref.current;
    if (!currentElement) return;

    const onFocus = () => setFocussed(true);
    const onBlur = () => setFocussed(false);

    currentElement.addEventListener('focus', onFocus);
    currentElement.addEventListener('blur', onBlur);

    return () => {
      currentElement.removeEventListener('focus', onFocus);
      currentElement.removeEventListener('blur', onBlur);
    };
  }, []); // ✅ empty array — no need to re-register listeners on every render

  return [ref, focussed];
};

export default useFocus;