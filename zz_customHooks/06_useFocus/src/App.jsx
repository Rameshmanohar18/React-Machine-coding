// Step 1: Destructure [ref, isFocussed] from useFocus hook
// Step 2: Attach ref to the input element so the hook can track its focus state
// Step 3: Conditionally render "focused" or "not focused" based on isFocussed value

import useFocus from './customHooks/useFocus';

const App = () => {
  const [ref, isFocussed] = useFocus();

  return (
    <div>
      <input ref={ref} />
      <p>{isFocussed ? 'focused' : 'not focused'}</p>
    </div>
  );
};

export default App;
