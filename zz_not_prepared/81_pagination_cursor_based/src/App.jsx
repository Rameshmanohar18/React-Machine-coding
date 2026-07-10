import { useInfiniteScroll } from './useInfiniteScroll';
import { useRef } from 'react';

export default function App() {
  const loadMoreRef = useRef(null);
  const { isLoading, results } = useInfiniteScroll(loadMoreRef);
  return (
    <div className='App'>
      <div className='wrapper'>
        {results.map((e) => (
          <Characters key={e.id} {...e} />
        ))}
        <div ref={loadMoreRef} />
      </div>
      {isLoading && <div className='loading'>Loading...</div>}
    </div>
  );
}

const Characters = ({ name, status, species, image }) => {
  return (
    <div className='character'>
      <img src={image} alt={name} />
      <div>
        <p>Name: {name}</p>
        <p>Status: {status}</p>
        <p>Species: {species}</p>
      </div>
    </div>
  );
};
