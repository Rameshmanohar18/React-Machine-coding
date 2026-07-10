import { useState, useCallback } from 'react';
import useIntersectionObserver from './customHooks/useIntersectionObserver';

function InfiniteScroll() {
  const [images, setImages] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      url: `https://picsum.photos/200/200?random=${i + 1}`,
    }))
  );
  const [isFetching, setIsFetching] = useState(false);
  const [nextImageId, setNextImageId] = useState(6);

  // Callback for intersection
  const handleIntersect = useCallback(() => {
    if (isFetching) return;

    setIsFetching(true);
    setTimeout(() => {
      const newImages = Array.from({ length: 5 }, (_, i) => ({
        id: nextImageId + i,
        url: `https://picsum.photos/200/200?random=${nextImageId + i}`,
      }));
      setImages((current) => [...current, ...newImages]);
      setNextImageId((prev) => prev + 5);
      setIsFetching(false);
    }, 1000);
  }, [nextImageId, isFetching]);

  // Use the custom hook
  const loaderRef = useIntersectionObserver(
    handleIntersect,
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    },
    !isFetching // Enable only when not fetching
  );

  return (
    <div className='container'>
      <div className='image-container'>
        {images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt={`Random ${image.id}`}
            className='image'
          />
        ))}
      </div>
      {/* Sentinel div observed by IntersectionObserver */}
      <div ref={loaderRef} className='loader'>
        {isFetching && <h2>Loading...</h2>}
      </div>
    </div>
  );
}

export default InfiniteScroll;
