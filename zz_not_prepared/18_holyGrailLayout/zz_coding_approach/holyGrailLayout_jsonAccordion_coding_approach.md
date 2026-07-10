## Step 1: Setup in `App.jsx`

### What we do:

- Return a `div` with `className="parent"`.
- Inside it:
  - `header` tag
  - `div` with `className="left-sidebar"`
  - `main` tag for main content
  - `div` with `className="right-sidebar"`
  - `footer` tag

### Code:

```jsx
function App() {
  return (
    <div className='parent'>
      <header>Header</header>
      <div className='left-sidebar'>Left Sidebar</div>
      <main>Main Content</main>
      <div className='right-sidebar'>Right Sidebar</div>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
```

---

## Step 2: Desktop View (Width > 768px)

### Core Layout Logic:

- **Grid Setup**:

  - `grid-template-rows`:
    - Fixed height for header (e.g., `80px`).
    - Flexible middle (`1fr`).
    - Fixed height for footer (e.g., `50px`).
  - `grid-template-columns`:
    - Fixed width for sidebars (e.g., `200px`).
    - Flexible main content (`1fr`).

- **Grid Placement**:
  - `header`: `grid-column: 1 / 4` (span all 3 columns).
  - `left-sidebar`: `grid-column: 1 / 2` (first column).
  - `main`: `grid-column: 2 / 3` (middle column).
  - `right-sidebar`: `grid-column: 3 / 4` (last column).
  - `footer`: `grid-column: 1 / 4` (span all columns).

### Desktop View Layout:

```
+-------------------+-------------------+-------------------+
|       HEADER      |       HEADER      |       HEADER      |
+-------------------+-------------------+-------------------+
|   LEFT SIDEBAR    |   MAIN CONTENT     |  RIGHT SIDEBAR    |
+-------------------+-------------------+-------------------+
|       FOOTER      |       FOOTER       |       FOOTER      |
+-------------------+-------------------+-------------------+
```

### CSS:

```css
.parent {
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: 100px 1fr 100px;
  grid-template-columns: 40px 1fr 40px;
}

header {
  grid-column: 1 / 4;
}

.left-sidebar {
  grid-column: 1 / 2;
}

main {
  grid-column: 2 / 3;
}

.right-sidebar {
  grid-column: 3 / 4;
}

footer {
  grid-column: 1 / 4;
}
```

---

## Step 3: Mobile View (Width ≤ 768px)

### Core Layout Logic:

- **Grid Setup**:

  - `grid-template-rows`: `repeat(5, 1fr)` (5 equal rows).
  - `grid-template-columns`: `1fr` (only 1 column).

- **Grid Placement**:
  - All elements (`header`, `left-sidebar`, `main`, `right-sidebar`, `footer`) should span `grid-column: 1 / 2` (only one column).

### Mobile View Layout:

```
+-------------------+
|       HEADER      |
+-------------------+
|   LEFT SIDEBAR    |
+-------------------+
|    MAIN CONTENT   |
+-------------------+
|   RIGHT SIDEBAR   |
+-------------------+
|       FOOTER      |
+-------------------+
```

### CSS (Add Media Query):

```css
@media (max-width: 768px) {
  .parent {
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: 1fr;
  }

  header,
  .left-sidebar,
  main,
  .right-sidebar,
  footer {
    grid-column: 1 / 2;
  }
}
```

---
