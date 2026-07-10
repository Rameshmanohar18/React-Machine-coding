// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: totalCount → useState(null)
// → Total number of Pokemon available (e.g., 1302)
// → Used to calculate dropdown options

// State 2: limit → useState(5)
// → Number of items to fetch per page
// → Default: 5

// State 3: offset → useState(0)
// → Starting point in the list
// → offset=20 means skip first 20 items

// State 4: data → useState([])
// → Current page of Pokemon data
// → Array of objects: [{ name: '', url: '' }]

// State 5: nextUrl → useState(null)
// → URL for fetching next page
// → Provided by API response

// State 6: cache → useState({})
// → Object storing previously fetched data
// → Structure: { 'url': [data] }
// → Avoids redundant API calls

// ============================================
// useEffect - FETCH INITIAL DATA
// ============================================

// Dependencies: [limit, offset]
// → Runs on mount and when limit/offset changes

// fetchInitialData():
// → Construct URL: `${API_BASE_URL}?limit=${limit}&offset=${offset}`
// → await fetch(url) and response.json()
// → setTotalCount(result.count)
// → setData(result.results)
// → setNextUrl(result.next)
// → Cache results: setCache({ ...prevCache, [url]: result.results })

// ============================================
// FETCHDATA CALLBACK
// ============================================

// Dependencies: [nextUrl, cache]
// → useCallback for stable reference

// Logic:
// → Check if cache[nextUrl] exists
// → If cached: setData(cache[nextUrl]) and return
// → If not cached:
//   - await fetch(nextUrl)
//   - setData(result.results)
//   - setNextUrl(result.next)
//   - Update cache with new data

// ============================================
// HANDLELIMITCHANGE CALLBACK
// ============================================

// Dependencies: []
// → useCallback for stable reference

// Logic:
// → parseInt(event.target.value, 10) - convert to number
// → setLimit(parsedValue)
// → setOffset(0) - reset to first page

// ============================================
// HANDLENEXTCLICK CALLBACK
// ============================================

// Dependencies: [fetchData]
// → useCallback for stable reference

// Logic:
// → if (nextUrl) fetchData()
// → Only fetch if nextUrl exists

// ============================================
// OPTIONS MEMO
// ============================================

// Dependencies: [totalCount]
// → useMemo to calculate dropdown options

// Calculation:
// → Math.ceil(totalCount / 5) - number of options
// → [...Array(count)] creates array
// → .map((_, index) => ({ value: (index+1)*5, label: (index+1)*5 }))
// → Example: totalCount=1302 → options: [5, 10, 15, 20, ...]

// ============================================
// JSX STRUCTURE
// ============================================

// SECTION 1: Dropdown (conditional)
// → {totalCount && <select>...</select>}
// → Only renders when totalCount loaded
// → value={limit} - controlled select
// → onChange={handleLimitChange}
// → Maps options array to <option> elements

// SECTION 2: Pokemon list
// → <ul> with data.map()
// → Displays: {index + 1}. {pokemon.name}
// → key={index} for each item

// SECTION 3: Next button
// → <button onClick={handleNextClick}>Next</button>
// → Fetches next page of data

// ============================================
// KEY CONCEPTS
// ============================================

// API pagination → limit (items per page) and offset (starting point)
// Caching strategy → Store fetched data by URL to avoid re-fetching
// cache[url] check → If data exists in cache, use it instead of API call
// useCallback → Memoize functions that depend on other state
// useMemo → Memoize expensive calculations (dropdown options)
// parseInt(value, 10) → Convert string to number (base 10)
// Math.ceil() → Round up for total options calculation
// [...Array(n)] → Create array of length n for mapping
// Conditional rendering → {totalCount && ...} only show when loaded
// result.next → API provides next URL for pagination
// Spread in cache → {...prevCache, [url]: data} adds new entry immutably