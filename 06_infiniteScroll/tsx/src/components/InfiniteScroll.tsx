import React, { useState, useEffect } from 'react';
import '../App.css';

type Image = {
  id: number;
  url: string;
};

function InfiniteScroll() {
  const [images, setImages] = useState<Image[]>(
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      url: `https://picsum.photos/200/200?random=${i + 1}`,
    }))
  );
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [nextImageId, setNextImageId] = useState<number>(6);

  const fetchImages = () => {
    setIsFetching(true);

    setTimeout(() => {
      const newImages = Array.from({ length: 5 }, (_, i) => ({
        id: nextImageId + i,
        url: `https://picsum.photos/200/200?random=${nextImageId + i}`,
      }));

      setImages((currentImages) => [...currentImages, ...newImages]);
      setNextImageId(nextImageId + 5);
      setIsFetching(false);
    }, 1000);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !isFetching
    ) {
      fetchImages();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [nextImageId, isFetching, handleScroll]);

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
      {isFetching && (
        <div className='loader'>
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
}

export default InfiniteScroll;
