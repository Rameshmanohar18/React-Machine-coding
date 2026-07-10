import { useState, useEffect, useRef } from 'react';

function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const loaderRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Set up an IntersectionObserver to watch the loader element at the bottom of the list.
    // The callback fires whenever the loader enters or exits the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger a fetch if the loader is visible AND we're not already fetching.
        // The isFetching guard prevents duplicate fetches from overlapping.
        if (entry.isIntersecting && !isFetching) {
          setIsFetching(true);

          // Simulate an async data fetch (e.g. an API call) with a 1.5s delay.
          setTimeout(() => {
            // Dynamically calculate how many items fit in the viewport
            // so we always fill the screen regardless of item height.
            // Falls back to 30px if the first child isn't mounted yet (e.g. initial load).
            const itemHeight =
              containerRef.current?.firstChild?.offsetHeight || 30;
            const batch = Math.ceil(window.innerHeight / itemHeight);

            // Append the next batch of items by continuing the sequence
            // from wherever the current list left off.

            //   1. Spreading all existing items (...prev) to retain the current list.
            //   2. Generating `batch` new sequential numbers starting after the last item.
            //      e.g. if prev = [1,2,3] and batch = 5 → appends [4, 5, 6, 7, 8]
            //      Array.from({ length: batch }, (_, i) => prev.length + i + 1)
            //             ↑ creates `batch` slots    ↑ index i starts at 0, so +1 avoids duplication
            // End result: the list grows downward with unique, ordered item numbers on every fetch.
            setItems((prev) => [
              ...prev,
              ...Array.from({ length: batch }, (_, i) => prev.length + i + 1),
            ]);

            setIsFetching(false);
          }, 1500);
        }
      },
      // Fire the callback when at least 10% of the loader element is visible.
      { threshold: 0.1 }
    );

    // Attach the observer to the loader div (the sentinel at the bottom of the list).
    if (loaderRef.current) observer.observe(loaderRef.current);

    // Cleanup: disconnect the observer when the effect re-runs or the component unmounts
    // to avoid stale observers and memory leaks.
    return () => observer.disconnect();
  }, [isFetching]); // Re-run when isFetching changes so the guard condition stays in sync.

  return (
    <div ref={containerRef}>
      {items.map((n) => (
        <div key={n}>{n}</div>
      ))}
      <div ref={loaderRef}>{isFetching && <p>Loading...</p>}</div>
    </div>
  );
}

export default InfiniteScroll;
