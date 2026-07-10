import React, { useRef, useEffect, useState, memo } from 'react';

const VirtualList = ({
  items,
  itemHeight = 60,
  buffer = 10, // number of extra items above/below viewport
  renderItem, // (item, index) => JSX
  containerHeight = '80vh', // or pass a fixed height
}) => {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const observerRef = useRef(null);

  const [mountedChunks, setMountedChunks] = useState(new Set());

  const chunkSize = 40; // balance: more chunks = more observers, fewer = more DOM when mounted
  const totalHeight = items.length * itemHeight;
  const numChunks = Math.ceil(items.length / chunkSize);

  // Create observer once
  useEffect(() => {
    if (!containerRef.current) return;

    const margin = buffer * itemHeight;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.chunkIndex, 10);
          if (entry.isIntersecting) {
            setMountedChunks((prev) => new Set([...prev, index]));
          } else {
            setMountedChunks((prev) => {
              const next = new Set(prev);
              next.delete(index);
              return next;
            });
          }
        });
      },
      {
        root: containerRef.current,
        rootMargin: `${margin}px 0px ${margin}px 0px`,
        threshold: 0,
      }
    );

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [buffer, itemHeight]);

  // Observe all chunk placeholders on mount
  useEffect(() => {
    const observer = observerRef.current;
    if (!observer || !innerRef.current) return;

    const chunkElements =
      innerRef.current.querySelectorAll('[data-chunk-index]');
    chunkElements.forEach((el) => observer.observe(el));

    return () => {
      chunkElements.forEach((el) => observer.unobserve(el));
    };
  }, [items.length]); // re-observe if item count changes

  return (
    <div
      ref={containerRef}
      style={{
        height: containerHeight,
        overflowY: 'auto',
        position: 'relative',
        border: '1px solid #ccc', // optional
      }}
    >
      <div
        ref={innerRef}
        style={{
          height: `${totalHeight}px`,
          position: 'relative',
          width: '100%',
        }}
      >
        {Array.from({ length: numChunks }).map((_, chunkIndex) => {
          const start = chunkIndex * chunkSize;
          const count = Math.min(chunkSize, items.length - start);
          const top = start * itemHeight;
          const height = count * itemHeight;

          const isMounted = mountedChunks.has(chunkIndex);

          return (
            <div
              key={chunkIndex}
              data-chunk-index={chunkIndex}
              style={{
                position: 'absolute',
                top: `${top}px`,
                left: 0,
                width: '100%',
                height: `${height}px`,
                boxSizing: 'border-box',
              }}
            >
              {isMounted &&
                Array.from({ length: count }).map((_, offset) => {
                  const index = start + offset;
                  const item = items[index];
                  return (
                    <div
                      key={index}
                      style={{
                        height: `${itemHeight}px`,
                        boxSizing: 'border-box',
                      }}
                    >
                      {renderItem(item)}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Optional: memoize if renderItem is stable
export default memo(VirtualList);
