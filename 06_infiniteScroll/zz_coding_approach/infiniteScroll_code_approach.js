// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <InfiniteScroll /> component
// InfiniteScroll.jsx → contains all infinite scroll logic

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: images → holds array of image objects

// Initial value uses Array.from({ length: 5 }, (_, index) => ({ ... }))
// → Creates 5 initial images
// → Each with: id (index + 1) and url (picsum with random query)
// → Result: [{id: 1, url: "..."}, {id: 2, url: "..."}, ... {id: 5, url: "..."}]

// State 2: isFetching → useState(false)
// → Tracks if currently loading new images (like API loading state)
// → Prevents multiple simultaneous fetch calls

// State 3: nextImageId → useState(6)
// → Tracks the next image id to fetch
// → Starts at 6 because initial images are 1-5

// ============================================
// useEffect: SCROLL EVENT LISTENER
// ============================================

// Dependency array: [nextImageId, isFetching, handleScroll]
// → Re-runs when any of these change

// Setup scroll listener:
// → window.addEventListener('scroll', handleScroll)

// Cleanup function:
// → return () => window.removeEventListener('scroll', handleScroll)
// → Removes listener on unmount to prevent memory leaks

// ============================================
// HANDLESCROLL FUNCTION
// ============================================

// Purpose: Detect when user scrolls near bottom of page

// Scroll detection condition:
// window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !isFetching

// Breaking down the condition:

// Part 1: window.innerHeight
// → Visible viewport height

// Part 2: document.documentElement.scrollTop
// → How far user has scrolled from top

// Part 3: document.documentElement.offsetHeight
// → Total page height (including scrollable content)

// Part 4: offsetHeight - 100
// → Trigger point is 100px before actual bottom
// → Starts loading before user reaches absolute bottom

// Part 5: && !isFetching
// → Only fetch if not already fetching
// → Prevents duplicate requests

// If condition true: call fetchImages()

// ============================================
// FETCHIMAGES FUNCTION (CORE LOGIC)
// ============================================

// Simulates API call with setTimeout

// STEP 1: Set loading state
// → setIsFetching(true)

// STEP 2: Wrap logic in setTimeout (simulates network delay)
// → setTimeout(() => { ... }, 1000)

// STEP 3: Create new batch of 5 images inside setTimeout
// → Array.from({ length: 5 }, (_, index) => ({ ... }))
// → id: nextImageId + index (e.g., if nextImageId is 6: 6, 7, 8, 9, 10)
// → url: `https://picsum.photos/200/200?random=${nextImageId + index}`

// STEP 4: Append new images to existing ones
// → setImages((currentImages) => [...currentImages, ...newImages])
// → Spread operator combines old and new images

// STEP 5: Update nextImageId for next batch
// → setNextImageId(nextImageId + 5)
// → Example: was 6, now becomes 11 (for next batch 11-15)

// STEP 6: Reset loading state
// → setIsFetching(false)

// ============================================
// JSX RENDERING
// ============================================

// Map over images array:
// → images.map((image) => <img ... />)

// Each img element:
// → key={image.id}
// → src={image.url}
// → alt={`Random ${image.id}`}

// Conditional loading indicator:
// → {isFetching && <div>Loading...</div>}
// → Shows "Loading..." text when fetching new images

// ============================================
// INFINITE SCROLL FLOW
// ============================================

// Initial render:
// → Shows 5 images (id: 1-5)
// → nextImageId is 6
// → Scroll listener attached

// User scrolls down:
// → handleScroll continuously checks scroll position
// → When position reaches (viewport + scrolled >= total height - 100px):
//   - AND not currently fetching
//   - Calls fetchImages()

// fetchImages executes:
// → Sets isFetching to true → shows "Loading..."
// → After 1 second (setTimeout):
//   - Creates 5 new images (id: 6-10)
//   - Appends to existing images array
//   - Updates nextImageId to 11
//   - Sets isFetching to false → hides "Loading..."

// User scrolls more:
// → Process repeats
// → Next batch: id 11-15, then 16-20, and so on...
// → Infinite loading as long as user keeps scrolling

// ============================================
// KEY CONCEPTS
// ============================================

// Why Array.from? → Generate multiple objects with sequential ids easily
// Why nextImageId state? → Track where to start next batch of images
// Why isFetching check? → Prevent fetching multiple batches simultaneously
// Why -100 in scroll condition? → Better UX, loads before hitting absolute bottom
// Why setTimeout? → Simulates real API delay (in real app, use fetch/axios)
// Why spread operator in setImages? → Preserve existing images, add new ones
// Why cleanup in useEffect? → Remove event listeners to prevent memory leaks
// Why += 5 for nextImageId? → Each batch has 5 images, so increment by 5
// innerHeight + scrollTop = how far down user is from top
// offsetHeight = total scrollable height