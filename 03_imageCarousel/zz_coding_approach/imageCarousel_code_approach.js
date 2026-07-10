// ============================================
// DATA STRUCTURE
// ============================================

// Maintain array of slide items with structure: { id, imgSrc, alt }
// Ex: carouselData.js → [{id: 1, imgSrc: "...", alt: "..."}, ...]

// ============================================
// APP.JSX - SETUP
// ============================================

// Render Carousel component
// Pass slides array as data prop
// Ex: <Carousel data={slides} />

// ============================================
// CAROUSEL.JSX - MAIN COMPONENT
// ============================================

// State: Track current slide index
// useState(0) → starts from first slide (index 0)

// ============================================
// NAVIGATION FUNCTIONS
// ============================================

// nextSlide function:
// → Check if current slide is last one (slide === data.length - 1)
// → If yes: go to first slide (0)
// → If no: increment slide (slide + 1)
// Ternary: slide === data.length - 1 ? 0 : slide + 1

// prevSlide function:
// → Check if current slide is first one (slide === 0)
// → If yes: go to last slide (data.length - 1)
// → If no: decrement slide (slide - 1)
// Ternary: slide === 0 ? data.length - 1 : slide - 1

// ============================================
// RENDERING SLIDES
// ============================================

// Map over data array
// For each slideItem and index, render CarouselItem component

// Pass props:
// → key={slideItem.id}
// → imgSrc={slideItem.imgSrc}
// → alt={slideItem.alt}
// → isActive={slide === index} → current slide gets true, others false

// ============================================
// NAVIGATION BUTTONS
// ============================================

// Left arrow button:
// → onClick={prevSlide}
// → className='arrow arrow-left'

// Right arrow button:
// → onClick={nextSlide}
// → className='arrow arrow-right'

// ============================================
// INDICATORS (DOTS) - OPTIONAL
// ============================================

// Map over data using underscore (_, idx) → we only need index

// Render button for each slide
// → key={idx}
// → onClick={() => setSlide(idx)} → jump directly to that slide
// → className logic: active if (slide === idx), inactive otherwise
// → `indicator ${slide !== idx ? 'indicator-inactive' : ''}`

// ============================================
// CAROUSELITEM.JSX - CHILD COMPONENT
// ============================================

// Props: { imgSrc, alt, isActive }

// Render img with conditional className
// → Base class: 'slide'
// → Active class: 'slide-active' when isActive is true
// → className={`slide ${isActive ? 'slide-active' : ''}`}

// Only active slide is visible (others hidden via CSS opacity)

// ============================================
// CSS APPROACH
// ============================================

// App.jsx styling:
// → Center content: display: flex, justify-content: center, align-items: center

// .carousel:
// → position: relative (for absolute positioning of arrows/indicators)
// → display: flex, align-items: center, justify-content: center
// → Set width and height for image container

// .arrow (common for both arrows):
// → position: absolute (overlay on carousel)
// → width and height: 2rem (icon size)
// → z-index: 1 (appear above images)

// .arrow-left: left: 1rem (position on left side)
// .arrow-right: right: 1rem (position on right side)

// .slide (all images):
// → position: absolute (stack on top of each other)
// → opacity: 0 (hidden by default)

// .slide-active (current image):
// → position: relative
// → opacity: 1 (visible)

// .indicators:
// → position: absolute
// → bottom: 1rem (position at bottom of carousel)

// .indicator (individual dot):
// → background-color: white
// → height and width: 0.5rem (small circles)
// → border: none
// → margin: 0 0.2rem (spacing between dots)

// .indicator-inactive:
// → background-color: grey (non-active dots)

// ============================================
// LOGIC FLOW
// ============================================

// Initial render:
// → slide state is 0 (first image)
// → All images rendered but only index 0 has isActive={true}
// → Only first image visible via CSS

// Click next arrow:
// → nextSlide runs
// → If last slide → goes to 0, else increments
// → State updates → re-render
// → New slide becomes active

// Click prev arrow:
// → prevSlide runs
// → If first slide → goes to last, else decrements
// → State updates → re-render
// → New slide becomes active

// Click indicator dot:
// → setSlide(idx) runs directly
// → Jump to that specific slide index
// → State updates → re-render
// → Selected slide becomes active

// ============================================
// KEY CONCEPTS
// ============================================

// Why index-based? → Track position in array, easy prev/next logic
// Why ternary in nav? → Handle wrap-around (last→first, first→last)
// Why isActive prop? → Determine which slide to show via CSS
// Why position absolute on slides? → Stack all images in same space
// Why opacity toggle? → Show/hide without layout shifts
// Why map for indicators? → Create one dot per slide