import { useState, useEffect } from 'react';

// How many jobs to load per page
const PAGE_SIZE = 6;

export default function usePaginatedJobs() {
  // === STATE MANAGEMENT ===
  const [loading, setLoading] = useState(true); // Initial loading state
  const [loadingMore, setLoadingMore] = useState(false); // Loading more pages state
  const [jobs, setJobs] = useState([]); // Array of job objects with full details
  const [jobIds, setJobIds] = useState([]); // Array of job IDs from Hacker News API
  const [page, setPage] = useState(0); // Current page number (0-indexed)
  const [hasMore, setHasMore] = useState(true); // Whether more jobs are available

  // === EFFECT 1: FETCH ALL JOB IDS (runs once on mount) ===
  useEffect(() => {
    const fetchJobIds = async () => {
      try {
        // Fetch the list of all job story IDs from Hacker News API
        const res = await fetch(
          'https://hacker-news.firebaseio.com/v0/jobstories.json'
        );

        /* 
        API Response example:
        INPUT: API call to jobStories.json
        OUTPUT: [33648234, 33648156, 33648089, 33647987, 33647854, 33647789, ...]
        (Array of ~50-200 job ID numbers)
        */
        const ids = await res.json();

        // Store the job IDs and stop initial loading
        setJobIds(ids);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch job IDs:', error);
        setLoading(false);
      }
    };

    fetchJobIds();
  }, []); // Empty dependency array = run once on mount

  // === EFFECT 2: FETCH JOB DETAILS FOR CURRENT PAGE (runs when page or jobIds change) ===
  useEffect(() => {
    // Don't run if we haven't loaded job IDs yet
    if (jobIds.length === 0) return;

    const fetchPageJobs = async () => {
      setLoadingMore(true);

      // Calculate which job IDs to fetch for this page
      const start = page * PAGE_SIZE; // Example: page 0 -> start = 0, page 1 -> start = 6
      const end = start + PAGE_SIZE; // Example: page 0 -> end = 6, page 1 -> end = 12

      /*
      Slice operation example:
      INPUT: jobIds = [33648234, 33648156, 33648089, 33647987, 33647854, 33647789, 33647723, 33647654]
             page = 0, PAGE_SIZE = 6
             start = 0, end = 6
      OUTPUT: pageJobIds = [33648234, 33648156, 33648089, 33647987, 33647854, 33647789]
      */
      const pageJobIds = jobIds.slice(start, end);

      // If no job IDs for this page, we've reached the end
      if (pageJobIds.length === 0) {
        setHasMore(false);
        setLoadingMore(false);
        return;
      }

      try {
        // Fetch detailed information for each job ID in parallel
        /*
        Promise.all operation - Number of API calls depends on PAGE_SIZE and remaining jobs:
        
        TYPICAL CASE (PAGE_SIZE = 6):
        INPUT: pageJobIds = [33648234, 33648156, 33648089, 33647987, 33647854, 33647789] // 6 IDs
        PROCESS: Makes 6 parallel API calls:
          - fetch('https://hacker-news.firebaseio.com/v0/item/33648234.json')
          - fetch('https://hacker-news.firebaseio.com/v0/item/33648156.json') 
          - fetch('https://hacker-news.firebaseio.com/v0/item/33648089.json')
          - fetch('https://hacker-news.firebaseio.com/v0/item/33647987.json')
          - fetch('https://hacker-news.firebaseio.com/v0/item/33647854.json')
          - fetch('https://hacker-news.firebaseio.com/v0/item/33647789.json')
        OUTPUT: Array of 6 job detail objects
        
        LAST PAGE EXAMPLE (fewer jobs remaining):
        INPUT: pageJobIds = [33647123, 33647089] // Only 2 IDs left
        PROCESS: Makes 2 parallel API calls
        OUTPUT: Array of 2 job detail objects
        */
        const jobDetails = await Promise.all(
          pageJobIds.map((id) =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
              (res) => res.json()
            )
          )
        );

        // Add new jobs to the existing jobs array (append, don't replace)
        /*
        State update example:
        INPUT: 
          - Previous jobs state = [{ id: 123, title: "Previous Job" }]
          - New jobDetails = [{ id: 456, title: "New Job" }]
        OUTPUT: Updated jobs state = [
          { id: 123, title: "Previous Job" },
          { id: 456, title: "New Job" }
        ]
        */
        setJobs((prev) => [...prev, ...jobDetails]);

        // Check if there are more jobs to load
        // Example: if end (12) < jobIds.length (50), then hasMore = true
        setHasMore(end < jobIds.length);
      } catch (error) {
        console.error('Failed to fetch job details:', error);
      } finally {
        // Always stop the loading state, regardless of success/failure
        setLoadingMore(false);
      }
    };

    fetchPageJobs();
  }, [page, jobIds]); // Re-run when page number or jobIds change

  // === LOAD MORE FUNCTION ===
  /*
  Function to increment page number, triggering the useEffect above
  INPUT: page = 0
  OUTPUT: page = 1 (which triggers fetching the next 6 jobs)
  */
  const loadMore = () => setPage((prev) => prev + 1);

  // Return all the state and functions that components need
  return {
    jobs, // Array of job objects with full details
    loading, // Boolean: true during initial load
    loadingMore, // Boolean: true when loading additional pages
    hasMore, // Boolean: true if more jobs are available
    loadMore, // Function: call to load the next page
  };
}
