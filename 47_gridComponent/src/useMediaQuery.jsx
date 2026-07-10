import { useState, useEffect } from 'react';

/**
 * useMediaQuery - Custom hook for responsive breakpoints
 *
 * PURPOSE:
 * - Detect screen size changes in React
 * - Return true/false based on CSS media query
 * - Trigger re-render when screen crosses breakpoint
 *
 * USAGE:
 *   const isMobile = useMediaQuery('(max-width: 600px)');
 *   const isTablet = useMediaQuery('(max-width: 1024px)');
 *   const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 *
 */
export const useMediaQuery = (query) => {
  /**
   * Initialize state with current match status
   *
   * window.matchMedia(query):
   *   - Browser API that evaluates CSS media queries in JavaScript
   *   - Returns MediaQueryList object with .matches property
   *   - .matches is true if query currently matches, false otherwise
   *
   * We read .matches immediately to set correct initial state
   * (prevents flash of wrong layout on first render)
   */
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  /**
   * Effect: Subscribe to media query changes
   *
   * This runs:
   *   1. After initial render (sets up listener)
   *   2. When 'query' prop changes (re-subscribes to new query)
   */
  useEffect(() => {
    /**
     * Create MediaQueryList for the query
     *
     * Example: query = '(max-width: 600px)'
     * - When viewport > 600px: media.matches = false
     * - When viewport ≤ 600px: media.matches = true
     */
    const media = window.matchMedia(query);

    /**
     * Event handler for media query changes
     *
     * Called automatically by browser when:
     * - User resizes window across the breakpoint
     * - Device orientation changes
     * - Any change that affects the media query result
     *
     */
    const handler = (e) => setMatches(e.matches);

    /**
     * Subscribe to 'change' event
     *
     * 'change' event fires whenever the media query's match status changes
     * More efficient than resize event - only fires at breakpoints
     */
    media.addEventListener('change', handler);

    /**
     * Cleanup: Unsubscribe when component unmounts or query changes
     *
     * WHY important?
     * - Prevents memory leaks
     * - Stops updates to unmounted component (React warning)
     * - Removes old listener when query prop changes
     */
    return () => media.removeEventListener('change', handler);
  }, [query]); // Re-run effect if query string changes

  return matches;
};
