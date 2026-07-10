// Step 1: Create a buttonRef and attach it to the button element
// Step 2: useEventListener for click on buttonRef with { once: true } — fires only once then auto removes itself
// Step 3: useEventListener for keydown on window — no ref needed, window is the default target
// Step 4: useEventListener for resize on window — logs live window width on every resize
// Step 5: All three listeners are registered once on mount and cleaned up on unmount automatically

import { useRef } from 'react';
import useEventListener from './customHooks/useEventListener';

export default function App() {
  const buttonRef = useRef(null);

  useEventListener(
    'click',
    () => console.log('Button clicked — fires only once then stops'),
    buttonRef,
    { once: true }
  );

  useEventListener('keydown', (e) => console.log(`Key pressed: ${e.key}`));

  useEventListener('resize', () =>
    console.log(`Window resized to: ${window.innerWidth}px`)
  );

  return (
    <div>
      <button ref={buttonRef}>Click me (fires once only)</button>
      <p>Press any key or resize window to see other listeners in action</p>
    </div>
  );
}
