# Pagination with Custom Hook

---

## App.jsx

### Step 1: Fetching Posts using Custom Hook

```js
const { posts, loading } = useFetch(
  'https://jsonplaceholder.typicode.com/posts'
);
```

### Step 2: useState and Logic Setup

```js
const [currentPage, setCurrentPage] = useState(1);
const postsPerPage = 10;
let currentPosts = [];

if (!loading && posts?.length > 0) {
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
}
```

### Step 3: JSX Structure

```jsx
<div className='container'>
  <h1>BLOG</h1>
  {!loading && posts?.length > 0 && (
    <>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginateFun={setCurrentPage}
      />
    </>
  )}
</div>
```

---

## Posts.jsx

### Props: `posts`, `loading`

```jsx
if (loading) return <p>Loading...</p>;

return (
  <ul>
    {posts.map((post) => (
      <li key={post.id}>{post.title}</li>
    ))}
  </ul>
);
```

---

## Pagination.jsx

### Props: `postsPerPage`, `totalPosts`, `paginateFunc`

```js
const pageNumbers = [];
for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
  pageNumbers.push(i);
}
```

### Return JSX

```jsx
<ul className='pagination'>
  {pageNumbers.map((pageNum) => (
    <li key={pageNum}>
      <button onClick={() => paginateFunc(pageNum)}>{pageNum}</button>
    </li>
  ))}
</ul>
```

---

## Basic CSS (UI Styling)

```css
.container {
  width: 80%;
  margin: 0 auto;
  text-align: center;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.pagination li button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
```

---

## Summary

| Component        | Responsibility                                     |
| ---------------- | -------------------------------------------------- |
| `App.jsx`        | Fetch data, compute currentPosts, pass to children |
| `Posts.jsx`      | Render posts or show loading state                 |
| `Pagination.jsx` | Calculate page numbers, call paginate function     |
