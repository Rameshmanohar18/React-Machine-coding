// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → main component with pagination logic
// Posts.jsx → displays list of posts
// Pagination.jsx → displays page number buttons
// useFetch.js → custom hook for API calls

// ============================================
// CUSTOM HOOK: useFetch
// ============================================

// Purpose: Fetch data from API

// State 1: data → useState(null) → stores API response
// State 2: loading → useState(false) → tracks loading status

// useEffect with [url] dependency:
// → Runs when url changes or on mount

// Inside useEffect:
// → Define async fetchData function
// → setLoading(true) before fetch
// → Use fetch(url) to get data
// → Convert response to JSON: await response.json()
// → setData(newData) to store result
// → catch block: handle errors, setData(null)
// → finally block: setLoading(false) always runs

// Returns: { data, loading }

// ============================================
// APP.JSX - SETUP
// ============================================

// Call custom hook:
// → const { data: posts, loading } = useFetch(url)
// → Destructure and rename data to posts
// → Get loading state

// ============================================
// STATE MANAGEMENT
// ============================================

// State: currentPage → useState(1)
// → Tracks which page user is viewing
// → Default: page 1

// Constant: postsPerPage → 10
// → How many posts to show per page
// → Not state because it never changes

// Variable: currentPosts → []
// → Holds posts for current page
// → Recalculated on each render (not state)

// ============================================
// CORE PAGINATION LOGIC
// ============================================

// Only calculate if data loaded and posts exist:
// → Condition: !loading && posts?.length > 0

// STEP 1: Calculate indexOfLastPost
// → indexOfLastPost = currentPage * postsPerPage
// → Example: page 1 → 1 * 10 = 10
// → Example: page 2 → 2 * 10 = 20

// STEP 2: Calculate indexOfFirstPost
// → indexOfFirstPost = indexOfLastPost - postsPerPage
// → Example: page 1 → 10 - 10 = 0
// → Example: page 2 → 20 - 10 = 10

// STEP 3: Slice posts array
// → currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
// → Example page 1: posts.slice(0, 10) → first 10 posts
// → Example page 2: posts.slice(10, 20) → next 10 posts
// → slice excludes end index (so indexOfLastPost is exclusive)

// ============================================
// PAGINATE FUNCTION
// ============================================

// paginateFunc accepts: pageNumber

// Logic:
// → Check if pageNumber exists (truthy check)
// → If yes: setCurrentPage(pageNumber)
// → Updates state → triggers re-render → new slice calculated

// ============================================
// APP.JSX - RENDERING
// ============================================

// Main container div with className

// Header: <h1>My Blog</h1>

// Conditional rendering:
// → Check: posts?.length > 0
// → Ensures posts exist before rendering components

// Render Posts component:
// → Props: posts={currentPosts}, loading={loading}
// → Passes only current page's posts (already sliced)

// Render Pagination component:
// → Props: postsPerPage={postsPerPage}
// → Props: totalPosts={posts?.length}
// → Props: paginateFunc={paginateFunc}

// ============================================
// POSTS.JSX COMPONENT
// ============================================

// Props: { posts, loading }

// Loading check:
// → if (loading) return <h2>Loading...</h2>
// → Early return pattern

// Render posts list:
// → Wrap in <ul> with className
// → Map over posts array: posts?.map((post) => ...)
// → Each item in <li> with key={post.id}
// → Display post.title inside li

// ============================================
// PAGINATION.JSX COMPONENT
// ============================================

// Props: { postsPerPage, totalPosts, paginateFunc }

// Create pageNumbers array:
// → const pageNumbers = []
// → Start as empty array

// Calculate total pages and populate array:
// → for loop: i = 1 to Math.ceil(totalPosts / postsPerPage)
// → Why Math.ceil? Round up for partial pages
// → Example: 95 posts ÷ 10 per page = 9.5 → rounds to 10 pages
// → Push each number: pageNumbers.push(i)
// → Result: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Render page buttons:
// → Wrap in <ul> with className 'pagination'
// → Map over pageNumbers: pageNumbers?.map((pageNum) => ...)
// → Each in <li> with key={pageNum}
// → Button inside li:
//   - onClick={() => paginateFunc(pageNum)}
//   - Display: {pageNum}
//   - Calls function with page number when clicked

// ============================================
// PAGINATION FLOW
// ============================================

// Initial load (page 1):
// → useFetch called, loading = true
// → Posts component shows "Loading..."
// → API returns 100 posts
// → loading = false, posts populated
// → indexOfLastPost = 1 * 10 = 10
// → indexOfFirstPost = 10 - 10 = 0
// → currentPosts = posts.slice(0, 10) → first 10 posts
// → Posts component displays 10 items
// → Pagination shows buttons 1-10 (100 posts ÷ 10)

// User clicks page 3 button:
// → paginateFunc(3) called
// → setCurrentPage(3)
// → Component re-renders
// → indexOfLastPost = 3 * 10 = 30
// → indexOfFirstPost = 30 - 10 = 20
// → currentPosts = posts.slice(20, 30) → posts 21-30
// → Posts component displays posts 21-30
// → User sees page 3 content

// User clicks page 10 (last page with 95 total posts):
// → paginateFunc(10) called
// → setCurrentPage(10)
// → indexOfLastPost = 10 * 10 = 100
// → indexOfFirstPost = 100 - 10 = 90
// → currentPosts = posts.slice(90, 100) → posts 91-95 (only 5 posts)
// → Posts component displays remaining 5 posts

// ============================================
// CSS FOR PAGINATION
// ============================================

// .pagination class:
// → display: flex
// → justify-content: center
// → Centers pagination buttons horizontally

// Optional button styling:
// → Add spacing between buttons (margin)
// → Style active page differently (separate logic needed)
// → Hover effects for better UX

// ============================================
// KEY CONCEPTS
// ============================================

// Why Math.ceil? → Handle partial last page (95 posts needs 10 pages, not 9)
// Why slice? → Extract subset of array without mutating original
// Why multiply for indexOfLastPost? → Scale up by page number
// Why subtract for indexOfFirstPost? → Get start of current page window
// Why currentPosts not state? → Derived/calculated value, no need for state
// Why check posts?.length? → Ensure data loaded before rendering
// Why optional chaining (?)? → Prevent errors if posts is null/undefined
// Why for loop starting at 1? → Page numbers displayed to user start at 1
// Why pass pageNum to function? → Tell parent which page was clicked
// slice(start, end) → end is exclusive (slice(0, 10) gets indices 0-9)
// Custom hook pattern → Reusable data fetching logic
