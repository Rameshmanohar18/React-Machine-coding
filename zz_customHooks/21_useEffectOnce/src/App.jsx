// Step 1: Pass a callback into useEffectOnce — logs on mount, returns a cleanup that logs on unmount
// Step 2: No matter how many re-renders happen, the effect only runs once on mount
// Step 3: When component unmounts the returned cleanup function fires automatically

import useEffectOnce from './customHooks/useEffectOnce';

export default function App() {
  useEffectOnce(() => {
    console.log('Running effect once on mount');
    return () => {
      console.log('Running clean-up of effect on unmount');
    };
  });

  return null;
}
