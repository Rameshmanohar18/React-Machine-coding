# TODO Application - Redux Toolkit with API Integration

## Key Changes for Async Operations

### **createAsyncThunk** - Middleware for API calls

Redux Toolkit provides `createAsyncThunk` to handle async logic with automatic action creators for pending/fulfilled/rejected states.

## Implementation Overview

### 1️⃣ **todoSlice.js Changes**

**Import createAsyncThunk:**
```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
```

**Create async thunk:**
```javascript
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  const data = await response.json();
  return data;
});
```

**Add loading and error state:**
```javascript
const initialState = {
  todos: [],
  loading: false,
  error: null,
};
```

**Handle async actions with extraReducers:**
```javascript
extraReducers: (builder) => {
  builder
    .addCase(fetchTodos.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    })
    .addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
}
```

### 2️⃣ **TodoApp.jsx Changes**

**Import fetchTodos and useEffect:**
```javascript
import { useEffect } from 'react';
import { fetchTodos } from '../store/todoSlice';
```

**Destructure loading and error:**
```javascript
const { todos, loading, error } = useSelector((state) => state.todos);
```

**Dispatch fetchTodos on mount:**
```javascript
useEffect(() => {
  dispatch(fetchTodos());
}, [dispatch]);
```

**Render loading and error states:**
```javascript
if (loading) {
  return <div><h2>Loading todos...</h2></div>;
}

if (error) {
  return <div><h2>Error: {error}</h2></div>;
}
```

## Interview Talking Points

**1) createAsyncThunk Pattern**
- Automatically generates 3 action types: pending, fulfilled, rejected
- Accepts async function (API call)
- Returns promise with result
- No need for manual try/catch in component

**2) extraReducers vs reducers**
- `reducers`: For synchronous actions (addTodo, deleteTodo)
- `extraReducers`: For handling external actions (async thunks)

**3) Lifecycle of Async Action**
```
dispatch(fetchTodos())
  ↓
fetchTodos.pending → loading: true
  ↓
API call completes
  ↓
fetchTodos.fulfilled → todos: data, loading: false
  OR
fetchTodos.rejected → error: message, loading: false
```

**4) State Shape**
```javascript
{
  todos: [],      // API data
  loading: false, // Request status
  error: null     // Error message
}
```

**5) Component Loading Pattern**
- Show loading UI during fetch
- Show error UI if failed
- Show todos when successful
- Fetch once on component mount

**6) API Used**
JSONPlaceholder - Free fake API for testing
- URL: https://jsonplaceholder.typicode.com/todos
- Returns mock TODO data
- No auth required

## Async Flow Diagram

```
Component Mount
     ↓
useEffect runs
     ↓
dispatch(fetchTodos())
     ↓
[PENDING] loading: true
     ↓
API Call (fetch)
     ↓
[FULFILLED] todos: data, loading: false
     ↓
Component Re-renders with todos
```

## Alternative: Manual Middleware

If asked about custom middleware in interview:

```javascript
// Custom middleware (not needed with RTK)
const apiMiddleware = store => next => action => {
  if (action.type === 'FETCH_TODOS') {
    fetch('api/todos')
      .then(res => res.json())
      .then(data => store.dispatch({ type: 'FETCH_SUCCESS', payload: data }))
      .catch(err => store.dispatch({ type: 'FETCH_ERROR', payload: err }));
  }
  return next(action);
};
```

**But with Redux Toolkit, `createAsyncThunk` handles this automatically!**

## To Run

```bash
npm install
npm run dev
```

Todos will load from API on page load!