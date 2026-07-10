# TODO Application - React Context API

## Context API Pattern

React Context provides a way to share state across the component tree without prop drilling.

## File Structure

```
src/
├── context/
│   └── TodoContext.jsx    # Context + Provider + Custom Hook
├── components/
│   └── TodoApp.jsx        # Consumer component
├── App.jsx                # Wrapped with Provider
└── main.jsx               # Entry point
```

## Implementation Breakdown

### 1️⃣ **TodoContext.jsx** - Three Parts

**A) Create Context:**
```javascript
const TodoContext = createContext();
```

**B) Custom Hook (recommended pattern):**
```javascript
export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within TodoProvider');
  }
  return context;
};
```

**C) Provider Component:**
```javascript
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => { /* logic */ };
  const editTodo = (id, text) => { /* logic */ };
  // ... other functions
  
  const value = {
    todos,
    addTodo,
    editTodo,
    deleteTodo,
    toggleTodo,
  };
  
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
```

### 2️⃣ **TodoApp.jsx** - Consume Context

```javascript
import { useTodos } from '../context/TodoContext';

const TodoApp = () => {
  const { todos, addTodo, editTodo, deleteTodo, toggleTodo } = useTodos();
  
  // Use todos and functions directly
  return ( /* JSX */ );
};
```

### 3️⃣ **App.jsx** - Wrap with Provider

```javascript
import { TodoProvider } from './context/TodoContext';

const App = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};
```

## Context vs Redux Comparison

| Feature | Context API | Redux |
|---------|-------------|-------|
| **Setup** | Simple, built-in | External library |
| **Boilerplate** | Minimal | More (actions, reducers) |
| **State Updates** | Direct setState | Dispatch actions |
| **Middleware** | Not built-in | Built-in (thunk, saga) |
| **DevTools** | No | Yes |
| **Best For** | Simple/medium apps | Complex apps |

## Interview Talking Points

**1) createContext Pattern**
```javascript
// Create
const TodoContext = createContext();

// Provide
<TodoContext.Provider value={value}>
  {children}
</TodoContext.Provider>

// Consume
const value = useContext(TodoContext);
```

**2) Custom Hook Benefits**
- Cleaner consumption: `useTodos()` vs `useContext(TodoContext)`
- Error handling if used outside provider
- Can add additional logic/validations
- Better developer experience

**3) Context Value Object**
```javascript
const value = {
  todos,        // State
  addTodo,      // Functions
  editTodo,
  deleteTodo,
  toggleTodo,
};
```

**4) State Management in Provider**
- Uses regular `useState` hook
- All CRUD operations defined in provider
- Functions passed down via context value

**5) When to Use Context**
- Small to medium apps
- Avoid prop drilling (3+ levels)
- Shared UI state (theme, auth)
- No complex async logic needed

**6) When NOT to Use Context**
- Large apps with complex state
- Need time-travel debugging
- Frequent state updates (performance)
- Need middleware for API calls

**7) Context Re-render Behavior**
- When context value changes, ALL consumers re-render
- Can optimize with multiple contexts or memo
- Redux has better performance for large apps

## Context API Flow

```
App.jsx
  ↓
<TodoProvider> (creates state + functions)
  ↓
TodoApp.jsx (consumes via useTodos())
  ↓
Accesses: todos, addTodo, editTodo, etc.
  ↓
Calls addTodo() → updates state in provider
  ↓
All consumers re-render with new state
```

## Common Interview Questions

**Q: What's the difference between Context and Redux?**
A: Context is built-in, simpler, but Redux has middleware, DevTools, and better performance for complex apps.

**Q: When would you use Context over Redux?**
A: For simpler state management, avoiding prop drilling, or when you don't need Redux's advanced features.

**Q: Can Context replace Redux?**
A: For simple apps, yes. For complex apps with async logic, Redux Toolkit is still better.

**Q: What's prop drilling?**
A: Passing props through multiple levels of components just to reach a deeply nested child. Context solves this.

## To Run

```bash
npm install
npm run dev
```

No Redux needed - pure React! 🎉