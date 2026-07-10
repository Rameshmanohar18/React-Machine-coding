// Step 1: useWhyDidYouUpdate accepts 2 params (componentName, props) — componentName is just a label for logs, props is the entire props object of the component
// Step 2: Create a previousProps ref initialized to undefined — it will store the props from the previous render
// Step 3: Inside useEffect (no dependency array — runs after every render), check if previousProps.current exists (skip comparison on first render)
// Step 4: Grab all unique keys from both previousProps and currentProps combined — so we catch added and removed props too
// Step 5: Loop through all keys — use Object.is() to compare old vs new value for each key, if they differ push to changedProps object with { from, to } shape
// Step 6: If changedProps has any keys, log the componentName and the changedProps object to console
// Step 7: After comparison, update previousProps.current to the latest props so next render has fresh previous values to compare against

import { useEffect, useRef } from 'react';

const useWhyDidYouUpdate = (componentName, props) => {
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changedProps = {};

      allKeys.forEach((key) => {
        if (!Object.is(previousProps.current[key], props[key])) {
          changedProps[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changedProps).length > 0) {
        console.log(`[useWhyDidYouUpdate] ${componentName}`, changedProps);
      }
    }

    previousProps.current = props;
  });
};

export default useWhyDidYouUpdate;
