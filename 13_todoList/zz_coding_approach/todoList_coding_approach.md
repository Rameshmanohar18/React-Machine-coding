# Todo List App (React + Editable Items + Form Submission)

---

## App.jsx

* Import and render the `TodoList.jsx` component

```jsx
<TodoList />
```

---

## TodoList.jsx Breakdown

### Step 1: useState Declarations

```js
const [todoItems, setTodoItems] = useState(initialItems); // initialItems from data.js
const [inputValue, setInputValue] = useState('');
```

* Each `initialItems` object contains:

  * `id`: unique identifier
  * `text`: task description
  * `isEditing`: boolean flag (default: false)

---

## Step 2: JSX Return Structure

```jsx
<div className="todo-container">
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
    <button type="submit">Add Todo</button>
  </form>

  <ul>
    {todoItems.map((item) => (
      <li key={item.id}>
        {item.isEditing ? (
          <input
            type="text"
            value={item.text}
            onChange={(e) => handleEditChange(e, item.id)}
          />
        ) : (
          <span>{item.text}</span>
        )}

        <button onClick={() => handleEdit(item.id)}>
          {item.isEditing ? 'Save' : 'Edit'}
        </button>

        <button onClick={() => handleDelete(item.id)}>Delete</button>
      </li>
    ))}
  </ul>
</div>
```

---

## Core Logic Functions

### Toggle Edit Mode

```js
const handleEdit = (id) => {
  setTodoItems((prevItems) =>
    prevItems.map((item) =>
      item.id === id ? { ...item, isEditing: !item.isEditing } : item
    )
  );
};
```

### Handle Edit Input Change

```js
const handleEditChange = (e, id) => {
  const newValue = e.target.value;
  setTodoItems((prevItems) =>
    prevItems.map((item) =>
      item.id === id ? { ...item, text: newValue } : item
    )
  );
};
```

### Add New Todo on Form Submit

```js
const handleSubmit = (e) => {
  e.preventDefault();
  if (!inputValue.trim()) return;
  addTodo(inputValue);
  setInputValue('');
};

const addTodo = (text) => {
  setTodoItems((prevItems) => [
    ...prevItems,
    { id: `${text}-${Date.now()}`, text, isEditing: false }
  ]);
};
```

### Delete Todo Item

```js
const handleDelete = (id) => {
  setTodoItems((prevItems) => prevItems.filter((item) => item.id !== id));
};
```

---

## Summary

| Function           | Purpose                                         |
| ------------------ | ----------------------------------------------- |
| `todoItems`        | Holds all todos from initial data or user input |
| `inputValue`       | Tracks user input in form                       |
| `handleEdit`       | Toggles isEditing flag for given item           |
| `handleEditChange` | Updates the item's text as user types           |
| `handleSubmit`     | Adds a new todo item if input is non-empty      |
| `handleDelete`     | Removes item by ID from the list                |

* Simple and editable todo list
* Live editing and deleting capabilities
* Clear separation of UI and logic
