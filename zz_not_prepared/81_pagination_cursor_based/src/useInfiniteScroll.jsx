import { useState, useEffect, useCallback, useRef } from 'react';

export const useInfiniteScroll = (loadMoreRef) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Cursor for next page
  const [nextUrl, setNextUrl] = useState(
    'https://rickandmortyapi.com/api/character'
  );

  const isLoadingRef = useRef(false);

  const loadMore = useCallback(() => {
    if (isLoadingRef.current || !nextUrl) return;

    isLoadingRef.current = true;
    setIsLoading(true);
    fetch(nextUrl)
      .then((res) => res.json())
      .then((data) => {
        setResults((prev) => [...prev, ...data.results]);
        setNextUrl(data.info.next);
        isLoadingRef.current = false;
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        isLoadingRef.current = false;
        setIsLoading(false);
      });
  }, [nextUrl]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [loadMoreRef, loadMore]);

  return { isLoading, results };
};
