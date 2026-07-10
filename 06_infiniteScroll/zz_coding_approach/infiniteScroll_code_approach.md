# Infinite Scroll Component Guide (React)

---

## App.jsx

* Import and render the `InfiniteScroll.jsx` component

```jsx
<InfiniteScroll />
```

---

## InfiniteScroll.jsx Breakdown

### Step 1: useState Variables

```js
const [images, setImages] = useState(
  Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    url: `https://picsum.photos/200/200?random=${index + 1}`,
  }))
);

const [isFetching, setIsFetching] = useState(false);
const [nextImageId, setNextImageId] = useState(6); // starting from 6
```

---

### Step 2: useEffect for Scroll Listener

* Triggered when `nextImageId` or `isFetching` changes
* Registers and cleans up scroll event listener

```js
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [nextImageId, isFetching]);
```

---

### Step 3: Scroll Handling Function

```js
const handleScroll = () => {
  if (
    window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100 &&
    !isFetching
  ) {
    fetchImages();
  }
};
```

---

### Step 4: Fetch Images Function

```js
const fetchImages = () => {
  setIsFetching(true);

  setTimeout(() => {
    const newImages = Array.from({ length: 5 }, (_, index) => ({
      id: nextImageId + index,
      url: `https://picsum.photos/200/200?random=${nextImageId + index}`,
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
    setNextImageId((prevId) => prevId + 5);
    setIsFetching(false);
  }, 1000);
};
```

---

## JSX Return

### Step 5: Render Images

```jsx
<div className="image-container">
  {images.map((image) => (
    <img key={image.id} src={image.url} alt={`Image ${image.id}`} />
  ))}
  {isFetching && <p>Loading...</p>}
</div>
```

---

## Summary

| Feature        | Logic                                           |
| -------------- | ----------------------------------------------- |
| Initial Data   | `Array.from()` for default 5 images             |
| Scroll Trigger | `scrollTop + innerHeight >= offsetHeight - 100` |
| Fetch Logic    | Creates new image array using `nextImageId`     |
| State Update   | Append new images, increment ID tracker         |
| Conditional UI | `Loading...` text if `isFetching === true`      |

* Efficient, scroll-triggered infinite image loader
* Clean structure with separation of scroll logic and API simulation
