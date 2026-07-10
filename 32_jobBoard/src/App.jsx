import JobPosting from './JobPosting';
import usePaginatedJobs from './usePaginatedJobs';

export default function App() {
  // Extract all the pagination logic and state from our custom hook
  // This returns: { jobs: [], loading: boolean, loadingMore: boolean, hasMore: boolean, loadMore: function }
  const { jobs, loading, loadingMore, hasMore, loadMore } = usePaginatedJobs();

  // Show loading screen while fetching initial job IDs
  // This only shows on the very first load, not when loading more jobs
  if (loading) {
    return (
      <div className='app'>
        <h1 className='title'>Hacker News Jobs Board</h1>
        <p className='loading'>Loading...</p>
      </div>
    );
  }

  return (
    <div className='app'>
      <h1 className='title'>Hacker News Jobs Board</h1>

      <div className='jobs' role='list'>
        {/* 
        INPUT: jobs = [
          { id: 123, title: "Frontend Developer", by: "techCompany", time: 1609459200, url: "https://..." },
          { id: 124, title: "Backend Engineer", by: "startup", time: 1609459300, url: "https://..." }
        ]
        */}
        {jobs.map((job) => (
          // OUTPUT: Multiple <JobPosting> components rendered in the DOM
          <JobPosting key={job.id} {...job} />
        ))}
      </div>

      {/* 
      Load More Button - Only show if there are more jobs to load
      The button is disabled while loading to prevent multiple requests
      */}
      {hasMore && (
        <button
          className='load-more-button'
          disabled={loadingMore}
          onClick={loadMore}
        >
          {loadingMore ? 'Loading...' : 'Load more jobs'}
        </button>
      )}
    </div>
  );
}
