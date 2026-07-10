// Step 1: useIntersectionObserver accepts 3 params (callback, options, enabled) and returns targetRef — attach targetRef to any DOM element to observe it
// Step 2: Create two refs — targetRef holds the DOM element to observe, observerRef holds the IntersectionObserver instance itself
// Step 3: Destructure options with safe defaults — root (null = viewport), rootMargin ('0px'), threshold (0.1 = 10% visible triggers callback)
// Step 4: First two guard checks inside useEffect — if enabled is false skip everything, if callback is not a function warn and skip
// Step 5: Create a new IntersectionObserver instance and store it in observerRef.current — inside the observer callback, loop through entries and call callback(entry) only when entry.isIntersecting is true
// Step 6: Store targetRef.current in a local variable (currentTarget) and start observing it using observerRef.current.observe(currentTarget)
// Step 7: Cleanup — unobserve the currentTarget and disconnect the observer entirely to prevent memory leaks
// Step 8: Dependency array includes callback, root, rootMargin, threshold, enabled — observer rebuilds whenever any of these change
// Step 9: Return targetRef so the consumer can attach it to the DOM element they want to observe

import { useEffect, useRef } from 'react';

function useIntersectionObserver(callback, options = {}, enabled = true) {
  const targetRef = useRef(null);
  const observerRef = useRef(null);

  const { root = null, rootMargin = '0px', threshold = 0.1 } = options;

  useEffect(() => {
    // Skip if observer is disabled
    if (!enabled) return;

    // Skip if callback is not provided
    if (!callback || typeof callback !== 'function') {
      console.warn('useIntersectionObserver: callback must be a function');
      return;
    }

    // Create observer instance
    observerRef.current = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback(entry);
          }
        });
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    // Start observing the target element
    const currentTarget = targetRef.current;
    if (currentTarget) {
      observerRef.current.observe(currentTarget);
    }

    // Cleanup function
    return () => {
      if (observerRef.current) {
        if (currentTarget) {
          observerRef.current.unobserve(currentTarget);
        }
        observerRef.current.disconnect();
      }
    };
  }, [callback, root, rootMargin, threshold, enabled]);

  return targetRef;
}

export default useIntersectionObserver;
