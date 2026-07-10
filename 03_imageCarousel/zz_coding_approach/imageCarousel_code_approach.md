# Image Carousel Component Guide (Code + CSS)

---

## 📁 Data Setup

- Maintain an array of image objects with:
  - `id`
  - `src`
  - `alt`

Stored in `data.js` or `data.json`.

---

## App.jsx

- Use `Carousel.jsx` component.

```jsx
<Carousel data={slides} />
```

---

## Carousel.jsx Logic

### State:

- `slide` (number): current slide index

```js
const [slide, setSlide] = useState(0);
```

### 🔽 Navigation Handlers:

```js
const prevSlide = () => setSlide((prev) => prev - 1);
const nextSlide = () => setSlide((prev) => prev + 1);

// Core logic to create an infinite loop between the images

const nextSlide = () => setSlide(slide === data.length - 1 ? 0 : slide + 1);
const prevSlide = () => setSlide(slide === 0 ? data.length - 1 : slide - 1);
```

### Mapping Data:

```jsx
data.map((item, index) => (
  <CarouselItem
    key={item.id}
    src={item.src}
    alt={item.alt}
    isActive={index === slide}
  />
));
```

---

## CarouselItem.jsx

### Image Component:

```jsx
<img
  src={src}
  alt={alt}
  className={`slide ${isActive ? 'slide-active' : ''}`}
/>
```

- `isActive` determines whether a slide is visible.

---

## ➕ Extra Feature: Slide Indicators

- Used for current slide visibility (like dots under the image)

### ✅ Implementation:

```jsx
{
  data.map((_, index) => (
    <button
      key={index}
      onClick={() => setSlide(index)}
      className={`indicator ${slide !== index ? 'indicator-inactive' : ''}`}
    />
  ));
}
```

---

## 🎨 CSS Styling Guide

### App.jsx:

```html
<div className="App"></div>
```

- Center the component

### Carousel.jsx:

```css
/* main carousel container */
.carousel {
  position: relative; /* Allows absolute positioning of child elements (slides, arrows, indicators) relative to this container */
  display: flex; /* Uses flexbox to center child elements (slides) within the carousel */
  align-items: center; /* Vertically centers the slides within the carousel container */
  justify-content: center; /* Horizontally centers the slides within the carousel container */
  width: 500px; /* Sets the carousel's width to 500 pixels, defining its overall size */
  height: 300px; /* Sets the carousel's height to 300 pixels, defining the visible area for slides */
}
```

### ↔️ Arrows:

```css

/* Shared styling for navigation arrows (left and right) */
.arrow {
  position: absolute; /* Positions arrows absolutely within the carousel, allowing precise placement */
  width: 2rem; /* Sets the width of the arrows to 2rem for consistent sizing */
  height: 2rem; /* Sets the height of the arrows to 2rem, ensuring a square shape */
  z-index: 1; /* Ensures arrows appear above slides (z-index > 0) for clickability */
}

.arrow-left {
  left: 1rem; /* Positions the left arrow 1rem from the left edge of the carousel for accessibility */
}

.arrow-right {
  right: 1rem; /* Positions the right arrow 1rem from the right edge of the carousel for accessibility */
}
```

---

## Slides

```css

/* individual slides */
.slide {
  position: absolute; /* Positions all slides absolutely, stacking them in the same space */
  opacity: 0; /* Hides inactive slides by setting their opacity to 0 */
}

.slide-active {
  position: relative; /* Changes the active slide's positioning to relative, ensuring it integrates with the flex layout */
  opacity: 1; /* Makes the active slide fully visible */
}
```

---

## 🔘 Indicators

```css

.indicators {
  position: absolute; /* Positions the indicators absolutely within the carousel */
  bottom: 1rem; /* Places the indicators 1rem from the bottom of the carousel for visibility */
  display: flex; /* Uses flexbox to arrange indicators horizontally */
  justify-content: center; /* Centers the indicators horizontally within the container */
  width: 100%; /* Ensures the indicators container spans the full width of the carousel */
}

/* (dots) */
.indicator {
  background-color: white; /* Sets the indicator color to white for visibility (typically for active state) */
  height: 0.5rem; /* Sets the height of each indicator to 0.5rem for a small, subtle size */
  width: 0.5rem; /* Sets the width of each indicator to 0.5rem, ensuring a square shape */
  border: none; /* Removes any default border for a clean appearance */
  margin: 0 0.2rem; /* Adds 0.2rem spacing between indicators for separation */
  border-radius: 50%; /* Makes indicators circular, resembling typical carousel dots */
}

.indicator-inactive {
  background-color: grey; /* Sets inactive indicators to grey to distinguish them from the active indicator */
}
```

---

## ✅ Summary

| File               | Purpose                                  |
| :----------------- | :--------------------------------------- |
| `App.jsx`          | Renders the Carousel component           |
| `Carousel.jsx`     | Handles navigation, slide state, mapping |
| `CarouselItem.jsx` | Displays each image slide                |
| `data.js/json`     | Stores image data                        |
| `.css`             | Handles layout, transitions, indicators  |
