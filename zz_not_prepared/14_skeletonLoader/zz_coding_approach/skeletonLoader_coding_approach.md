# Skeleton Loader UI Guide

---

## App.jsx

### Step 1: Basic Card Structure

```jsx
<div className='card'>
  <div className='img skeleton-loader'></div>
  <h3 className='heading skeleton-loader'></h3>
  <p className='content1 skeleton-loader'></p>
  <p className='content2 skeleton-loader'></p>
</div>
```

---

## Skeleton Loader Animation with ::before

```css
.skeleton-loader::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    to right,
    transparent 0%,
    white 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  animation: loading-shimmer 1s infinite;
}

@keyframes loading-shimmer {
  100% {
    transform: translateX(100%);
  }
}
```

---

## Summary

| Element            | Purpose                                         |
| ------------------ | ----------------------------------------------- |
| `.card`            | Outer container with border and centered layout |
| `.skeleton-loader` | Shared class for gray loading state             |
| `::before` pseudo  | Adds animated gradient for shimmer effect       |
| `@keyframes`       | Drives animation of gradient from left to right |
