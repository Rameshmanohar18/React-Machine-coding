// ============================================
// USEPAGINATEDJOBS HOOK - STATE MANAGEMENT
// ============================================

// State 1: loading → useState(true)
// → Initial load state (fetching job IDs)

// State 2: loadingMore → useState(false)
// → Loading subsequent pages

// State 3: jobs → useState([])
// → Accumulated array of job detail objects

// State 4: jobIds → useState([])
// → Array of all job IDs from API

// State 5: page → useState(0)
// → Current page number (0-indexed)

// State 6: hasMore → useState(true)
// → Boolean for remaining jobs

// Constant: PAGE_SIZE = 6
// → Jobs per page

// ============================================
// USEPAGINATEDJOBS - EFFECT 1 (FETCH JOB IDS)
// ============================================

// Dependencies: []
// → Runs once on mount

// Logic:
// → fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
// → Response: array of job ID numbers
// → setJobIds(ids)
// → setLoading(false)

// ============================================
// USEPAGINATEDJOBS - EFFECT 2 (FETCH PAGE DETAILS)
// ============================================

// Dependencies: [page, jobIds]
// → Runs when page or jobIds changes

// Logic:
// → if (jobIds.length === 0) return - guard clause
// → setLoadingMore(true)
// → Calculate slice: start = page * PAGE_SIZE, end = start + PAGE_SIZE
// → pageJobIds = jobIds.slice(start, end)
// → if (pageJobIds.length === 0) - no more jobs
// → Promise.all with pageJobIds.map((id) => fetch detail endpoint)
// → setJobs((prev) => [...prev, ...jobDetails]) - append new jobs
// → setHasMore(end < jobIds.length)
// → setLoadingMore(false)

// ============================================
// USEPAGINATEDJOBS - LOADMORE FUNCTION
// ============================================

// Logic:
// → setPage((prev) => prev + 1)
// → Increments page, triggers Effect 2

// Return:
// → { jobs, loading, loadingMore, hasMore, loadMore }

// ============================================
// APP.JSX - STRUCTURE
// ============================================

// Hook usage:
// → const { jobs, loading, loadingMore, hasMore, loadMore } = usePaginatedJobs()

// Initial loading:
// → if (loading) return <Loading />

// Jobs list:
// → jobs.map((job) => <JobPosting key={job.id} {...job} />)
// → Spread props: id, title, by, time, url

// Load more button:
// → {hasMore && <button disabled={loadingMore} onClick={loadMore}>}
// → Conditional rendering based on hasMore
// → Disabled during loadingMore

// ============================================
// JOBPOSTING.JSX - STRUCTURE
// ============================================

// Props: { url, by, time, title }

// Title rendering:
// → {url ? <a href={url} target='_blank'>{title}</a> : title}
// → Conditional link or plain text

// Metadata:
// → "By {by} {new Date(time * 1000).toLocaleString()}"
// → time * 1000 converts Unix timestamp to milliseconds

// ============================================
// KEY CONCEPTS
// ============================================

// Custom hook → Encapsulate pagination logic
// Two-stage loading → First job IDs, then details
// .slice(start, end) → Extract page subset from array
// Promise.all → Parallel API calls for multiple jobs
// Append pattern → setJobs((prev) => [...prev, ...new]) accumulates results
// Guard clause → if (jobIds.length === 0) return prevents premature execution
// Disabled button → disabled={loadingMore} prevents duplicate requests
// Unix timestamp * 1000 → Convert seconds to milliseconds for Date
// Spread props → {...job} passes all properties
// rel='noopener' → Security for target='_blank' links
// Empty dependency [] → Run once on mount
// PAGE_SIZE constant → Controls pagination chunk size
