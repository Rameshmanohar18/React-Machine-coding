# TODO Application - Redux Toolkit Version

## Key Differences from Plain Redux

### 1️⃣ **createSlice** replaces:
- Action Types (actionTypes.js) ❌
- Action Creators (actions.js) ❌  
- Reducer (reducer.js) ❌

All three combined into **todoSlice.js** ✅

### 2️⃣ **configureStore** replaces createStore
- Built-in Redux DevTools
- Built-in thunk middleware
- Automatic setup

### 3️⃣ **Immer Integration**
Redux Toolkit uses Immer internally, so you can write "mutating" logic:

```javascript
// Plain Redux (immutable)
return {
  ...state,
  todos: state.todos.map(todo =>
    todo.id === id ? { ...todo, text } : todo
  )
};

// Redux Toolkit (looks mutable, but safe)
const todo = state.todos.find(todo => todo.id === id);
if (todo) {
  todo.text = text;
}
```

## File Structure

```
src/
├── store/
│   ├── todoSlice.js    # Slice (actions + reducer)
│   └── store.js        # Configure store
├── components/
│   └── TodoApp.jsx     # Component with hooks
├── App.jsx             # Provider wrapper
└── main.jsx            # Entry point
```

## Redux Toolkit Slice Pattern

```javascript
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      // Direct mutation (Immer handles immutability)
      state.todos.push(action.payload);
    }
  }
});

// Auto-generated actions
export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
```

## Component Changes

**useSelector path changed:**
```javascript
// Plain Redux
const todos = useSelector((state) => state.todos);

// Redux Toolkit
const todos = useSelector((state) => state.todos.todos);
```

**Action dispatch (simplified):**
```javascript
// Plain Redux
dispatch(addTodo(text));    // text already in payload
dispatch(editTodo(id, text)); // multiple params

// Redux Toolkit  
dispatch(addTodo(text));      // same!
dispatch(editTodo({ id, text })); // object payload
```

## Interview Talking Points

**1) Less Boilerplate**
- No action types constants
- No action creator functions
- Reducer logic more concise

**2) Built-in Immer**
- Write simpler update logic
- No spread operators needed
- Still immutable under the hood

**3) configureStore Benefits**
- DevTools enabled by default
- Middleware pre-configured
- Better TypeScript support

**4) Slice Pattern**
- Co-locates related logic
- Auto-generates action creators
- Easier to maintain

## To Run
```bash
npm install
npm run dev
```