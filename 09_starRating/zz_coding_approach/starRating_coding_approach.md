# Star Rating

---

## App.jsx

- Import and render the `StarRating.jsx` component

```jsx
<StarRating />
```

---

### Step 1: State and Variable Declarations

```js
const [rating, setRating] = useState(0);
const [hoverRating, setHoverRating] = useState(0);
const currentRating = hoverRating || rating;

const ratingMessages = ['Awful', 'Poor', 'Fair', 'Good', 'Excellent'];
```

---

## JSX Template Structure

```jsx
<div className='container'>
  <div className='star-rating'>
    {Array.from({ length: 5 }, (_, index) => renderStar(index))}
    <span className='rating-message'>
      <strong>{getRatingMessage(currentRating)}</strong>
    </span>
  </div>
</div>
```

---

## Step 2: Star Rendering Logic

```js
const renderStar = (index) => {
  const fullStar = currentRating > index;
  return (
    <span
      key={index}
      className={`star ${fullStar ? 'full' : ''}`}
      onClick={() => setRating(index + 1)}
      onMouseOver={() => setHoverRating(index + 1)}
      onMouseLeave={() => setHoverRating(0)}
    >
      {fullStar ? '★' : '☆'}
    </span>
  );
};
```

---

## Step 3: Rating Message Function

```js
const getRatingMessage = (value) => {
  return ratingMessages[Math.ceil(value) - 1];
};
```

> Note: Start `rating` and `hoverRating` from 0 (not 1) to prevent `undefined` index in the array.

---

## CSS Styling Guide

```css
.star-rating {
  position: relative;
}

.star {
  color: grey;
}

.star.full {
  color: gold;
}

.rating-message {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0.5rem;
}
```

---

## Summary

| Feature              | Logic                                              |
| -------------------- | -------------------------------------------------- |
| Rating & Hover       | Track current and hover values for visual feedback |
| `renderStar()`       | Renders each star with dynamic fill and handlers   |
| `getRatingMessage()` | Maps rating value to feedback string               |
| Dynamic Color        | Grey for empty, gold for selected                  |
| Message Placement    | Absolute positioning below the stars               |
