// ============================================
// APPLICATION STRUCTURE
// ============================================

// App.jsx → Router setup and configuration
// Pages:
// → HomeLayout.jsx → Layout wrapper with Navbar
// → Landing.jsx → Main search page with cocktail list
// → Cocktail.jsx → Individual cocktail details page
// → About.jsx → Static about page
// Components:
// → Navbar.jsx → Navigation links
// → SearchForm.jsx → Search input form
// → CocktailList.jsx → Renders list of cocktail cards
// → CocktailCard.jsx → Individual cocktail card display

// ============================================
// APP.JSX - ROUTER SETUP
// ============================================

// Import: createBrowserRouter, RouterProvider from react-router-dom

// Create router using createBrowserRouter:
// → Accepts array of route objects
// → Each route has: path, element, children (optional)

// Root route structure:
// → path: '/'
// → element: <HomeLayout /> (parent wrapper)
// → children: array of nested routes

// Child routes:

// Route 1 - Index route (Landing page):
// → index: true (renders at exact '/' path)
// → element: <Landing />

// Route 2 - Dynamic cocktail details:
// → path: 'cocktail/:id' (colon makes 'id' a URL parameter)
// → element: <Cocktail />
// → Example URL: '/cocktail/11022'

// Route 3 - Static about page:
// → path: 'about'
// → element: <About />

// Return: <RouterProvider router={router} />
// → Provides routing to entire app

// ============================================
// HOMELAYOUT.JSX - LAYOUT WRAPPER
// ============================================

// Purpose: Common layout for all home routes

// Import: Outlet, useNavigation from react-router-dom

// useNavigation hook:
// → const navigation = useNavigation()
// → Returns navigation state object
// → navigation.state values: 'idle', 'loading', 'submitting'

// Check loading state:
// → const isPageLoading = navigation.state === 'loading'
// → True when navigating between routes

// Optional context value:
// → const value = 'some value'
// → Can be accessed in child routes via useOutletContext()

// JSX structure:

// Navbar component → Always visible at top

// Main section with className 'page':
// → Conditional rendering based on isPageLoading

// If loading:
// → <div className='loading' /> (CSS spinner)

// If not loading:
// → <Outlet context={{ value }} />
// → Renders matched child route component
// → Passes context to children

// ============================================
// LANDING.JSX - MAIN SEARCH PAGE
// ============================================

// Purpose: Search cocktails and display results

// Imports: useSearchParams, axios

// API endpoint:
// → const cocktailSearchUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

// useSearchParams hook:
// → const [searchParams, setSearchParams] = useSearchParams()
// → Read/write URL query parameters
// → Example: ?search=margarita

// Extract search term:
// → const searchTerm = searchParams.get('search') || 'margarita'
// → Get 'search' param from URL or default to 'margarita'

// State management:

// State 1: drinks → useState([])
// → Stores fetched cocktail data array

// State 2: loading → useState(true)
// → Tracks API loading state

// ============================================
// FETCHCOCKTAILS FUNCTION (LANDING.JSX)
// ============================================

// Purpose: Fetch cocktails from API

// Async function logic:

// STEP 1: Set loading to true
// → setLoading(true)

// STEP 2: Make API request
// → const { data } = await axios.get(`${cocktailSearchUrl}${searchTerm}`)
// → Appends searchTerm to URL
// → Example: searchTerm = 'vodka' → URL ends with 's=vodka'

// STEP 3: Update drinks state
// → setDrinks(data.drinks || [])
// → Sets drinks array or empty array if none found

// STEP 4: Error handling
// → catch block logs error
// → setDrinks([]) on error

// STEP 5: Finally block
// → setLoading(false) always runs
// → Hides loading indicator

// useEffect with dependency:
// → useEffect(() => { fetchCocktails() }, [searchTerm])
// → Runs whenever searchTerm changes
// → Automatically fetches new results

// JSX rendering:

// SearchForm component:
// → Props: searchTerm, setSearchParams
// → Handles user input for search

// Conditional rendering:
// → If loading: show "Loading..." message
// → If not loading: render <CocktailList drinks={drinks} />

// ============================================
// SEARCHFORM.JSX - SEARCH INPUT
// ============================================

// Purpose: Handle cocktail search input

// Props: { searchTerm, setSearchParams }

// handleSubmit function:

// STEP 1: Prevent default
// → e.preventDefault()
// → Stops page reload

// STEP 2: Get input value
// → const value = e.target.elements.search.value
// → Access form input by name attribute 'search'

// STEP 3: Update URL params
// → setSearchParams({ search: value })
// → Updates URL to ?search=value
// → Triggers re-render in Landing (searchTerm changes)

// JSX structure:

// Form element:
// → onSubmit={handleSubmit}

// Input field:
// → type='search'
// → name='search' (used in handleSubmit)
// → defaultValue={searchTerm}
// → Pre-fills with current search term

// Submit button:
// → type='submit'
// → Text: "search"

// ============================================
// COCKTAILLIST.JSX - DISPLAY LIST
// ============================================

// Purpose: Render list of cocktail cards

// Props: { drinks }

// Empty state check:
// → if (!drinks || drinks.length === 0)
// → Return message: "No matching cocktails found..."

// Format drinks data:
// → const formattedDrinks = drinks.map(({ ... }) => ({ ... }))

// API response format → Component format:
// → idDrink → id
// → strDrink → name
// → strDrinkThumb → image
// → strAlcoholic → info
// → strGlass → glass

// Example transformation:
// → { idDrink: '11022', strDrink: 'Margarita', ... }
// → { id: '11022', name: 'Margarita', ... }

// JSX rendering:

// Container div with className 'cocktail-list'

// Map over formattedDrinks:
// → formattedDrinks.map((item) => <CocktailCard key={item.id} {...item} />)
// → Spread operator passes all properties as props

// ============================================
// COCKTAILCARD.JSX - INDIVIDUAL CARD
// ============================================

// Purpose: Display single cocktail preview

// Props: { image, name, id, info, glass }

// JSX structure:

// Main div with className 'cocktail-card'

// Image container:
// → div with className 'img-container'
// → img with src={image}, alt={name}

// Footer section:
// → h4 with cocktail name
// → h5 with glass type
// → p with info (alcoholic/non-alcoholic)

// Link to details:
// → <Link to={`/cocktail/${id}`}>
// → Template literal creates dynamic URL
// → Example: id='11022' → '/cocktail/11022'
// → Navigates to Cocktail component

// ============================================
// COCKTAIL.JSX - DETAILS PAGE
// ============================================

// Purpose: Display full cocktail details

// Imports: useParams, useNavigate, axios

// API endpoint:
// → const singleCocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

// useParams hook:
// → const { id } = useParams()
// → Extracts 'id' from URL parameter
// → Example: '/cocktail/11022' → id = '11022'

// useNavigate hook:
// → const navigate = useNavigate()
// → Programmatic navigation function

// State management:

// State 1: drink → useState(null)
// → Stores single cocktail object

// State 2: loading → useState(true)
// → Loading state for fetch

// ============================================
// FETCHDRINK FUNCTION (COCKTAIL.JSX)
// ============================================

// Purpose: Fetch single cocktail by ID

// useEffect with [id] dependency:
// → Runs on mount and when id changes

// Async fetchDrink function:

// STEP 1: Set loading to true
// → setLoading(true)

// STEP 2: API request
// → const { data } = await axios.get(`${singleCocktailUrl}${id}`)
// → Appends id to URL
// → Example: id='11022' → URL ends with 'i=11022'

// STEP 3: Set drink data
// → setDrink(data.drinks?.[0] || null)
// → Optional chaining with [0] gets first item
// → Sets null if not found

// STEP 4: Error handling
// → catch block logs error

// STEP 5: Finally block
// → setLoading(false)

// Early returns:

// Loading check:
// → if (loading) return <h4>Loading...</h4>

// No drink check:
// → if (!drink) return <h4>No cocktail found...</h4>

// Destructure drink properties:
// → Rename API fields to cleaner names
// → strDrink → name
// → strDrinkThumb → image
// → strAlcoholic → info
// → strCategory → category
// → strGlass → glass
// → strInstructions → instructions

// JSX structure:

// Main section with className 'cocktail-page'

// Header section:
// → Back button:
//   - onClick={() => navigate(-1)}
//   - Goes to previous page in history
// → h3 with cocktail name

// Drink details div:
// → img with cocktail image
// → div with className 'drink-info'

// Info paragraphs:
// → Each with span.drink-data label
// → Displays: name, category, info, glass, instructions

// Optional ingredients logic (commented):
// → Filter object keys starting with 'strIngredient'
// → Map to extract ingredient values
// → Display as comma-separated list

// ============================================
// NAVBAR.JSX - NAVIGATION
// ============================================

// Purpose: Site navigation links

// Import: NavLink from react-router-dom

// JSX structure:

// nav with className 'navbar'

// Two NavLink components:
// → NavLink to='/' → Home link
// → NavLink to='/about' → About link

// NavLink vs Link:
// → NavLink automatically adds 'active' class to current route
// → Useful for styling active navigation items

// ============================================
// ABOUT.JSX - STATIC PAGE
// ============================================

// Purpose: Display app information

// Simple component with static content

// JSX structure:
// → section with className 'about-page'
// → h3 heading
// → p with description text

// ============================================
// KEY CONCEPTS
// ============================================

// Why createBrowserRouter? → Modern router setup with data APIs
// Why Outlet? → Renders matched child route in parent layout
// Why useParams? → Access dynamic URL parameters
// Why useNavigate? → Programmatic navigation (go back, redirect)
// Why useSearchParams? → Read/write URL query strings
// Why NavLink vs Link? → NavLink adds 'active' class for current route
// Why useNavigation? → Track route transition states (loading)
// Why index route? → Default child at parent's exact path
// Why dynamic routes (:id)? → Handle variable URL segments
// Why optional chaining (?.)? → Safe property access, avoid errors
// Why defaultValue vs value? → Uncontrolled input with initial value
// Why e.target.elements? → Access form controls by name
// Why destructuring in map? → Extract and rename object properties
// Why spread in props? → Pass all object properties as individual props
// navigate(-1) → Go back one entry in history stack
// Template literals in routes → Create dynamic paths with variables
// children array in routes → Nested route configuration