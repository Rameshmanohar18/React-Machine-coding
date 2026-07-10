import { useState } from 'react';
import './TodoList.css';
import { initialItems } from '../data';

function TodoList() {
  const [todoItems, setTodoItems] = useState(initialItems);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'

  // Add a single item to the existing list
  const addTodoItem = (item) => {
    setTodoItems((prevItems) => [
      ...prevItems,
      {
        id: `${item}-${Date.now()}`,
        text: item,
        isEditing: false,
        isCompleted: false,
      },
    ]);
  };

  // Delete item by id
  const handleDelete = (id) => {
    setTodoItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Toggle completion status
  const handleToggleComplete = (id) => {
    setTodoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  // Handle double-click to enable editing
  const handleDoubleClick = (id) => {
    setTodoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isEditing: true } : item
      )
    );
  };

  // Save edit (disable editing mode)
  const handleSaveEdit = (id) => {
    setTodoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isEditing: false } : item
      )
    );
  };

  // Handle changing the text of an item
  const handleEditChange = (e, id) => {
    const newValue = e.target.value;
    setTodoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, text: newValue } : item
      )
    );
  };

  // Handle Enter key to save edit
  const handleEditKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      handleSaveEdit(id);
    }
  };

  // Remove all completed items
  const handleRemoveCompleted = () => {
    setTodoItems((prevItems) => prevItems.filter((item) => !item.isCompleted));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodoItem(inputValue);
      setInputValue('');
    }
  };

  // Filter items based on selected filter
  const getFilteredItems = () => {
    switch (filter) {
      case 'completed':
        return todoItems.filter((item) => item.isCompleted);
      case 'incomplete':
        return todoItems.filter((item) => !item.isCompleted);
      default:
        return todoItems;
    }
  };

  const filteredItems = getFilteredItems();
  const completedCount = todoItems.filter((item) => item.isCompleted).length;
  const incompleteCount = todoItems.length - completedCount;

  return (
    <div className='container text-center'>
      <h1>Todo List</h1>

      <form id='todoForm' onSubmit={handleSubmit}>
        <input
          type='text'
          id='todoItemInput'
          autoComplete='off'
          placeholder='Add a new item'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>

      {/* Item Count */}
      <div className='stats'>
        <span className='stat-item'>Total: {todoItems.length}</span>
        <span className='stat-item'>Completed: {completedCount}</span>
        <span className='stat-item'>Incomplete: {incompleteCount}</span>
      </div>

      {/* Filter Buttons */}
      <div className='filters'>
        <button
          className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={
            filter === 'completed' ? 'filter-btn active' : 'filter-btn'
          }
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button
          className={
            filter === 'incomplete' ? 'filter-btn active' : 'filter-btn'
          }
          onClick={() => setFilter('incomplete')}
        >
          Incomplete
        </button>
      </div>

      {/* Remove Completed Button */}
      {completedCount > 0 && (
        <button className='remove-completed' onClick={handleRemoveCompleted}>
          Remove Completed ({completedCount})
        </button>
      )}

      <ul id='listContainer' className='list-container'>
        {filteredItems.map((item) => (
          <li key={item.id} className={item.isCompleted ? 'completed' : ''}>
            {/* Checkbox for completion */}
            <input
              type='checkbox'
              checked={item.isCompleted}
              onChange={() => handleToggleComplete(item.id)}
              className='checkbox'
            />

            {/* Edit mode or display mode */}
            {item.isEditing ? (
              <input
                type='text'
                value={item.text}
                onChange={(e) => handleEditChange(e, item.id)}
                onKeyDown={(e) => handleEditKeyDown(e, item.id)}
                onBlur={() => handleSaveEdit(item.id)}
                autoFocus
                className='edit-input'
              />
            ) : (
              <span
                className='text'
                // onDoubleClick={() => handleDoubleClick(item.id)}
              >
                {item.text}
              </span>
            )}

            {/* Action Buttons */}
            <div className='actions'>
              {item.isEditing ? (
                <button
                  className='save'
                  onClick={() => handleSaveEdit(item.id)}
                >
                  💾
                </button>
              ) : (
                <button
                  className='edit'
                  onClick={() => handleDoubleClick(item.id)}
                >
                  ✏️
                </button>
              )}
              <button className='delete' onClick={() => handleDelete(item.id)}>
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>

      {filteredItems.length === 0 && todoItems.length > 0 && (
        <div className='no-elements'>No {filter} items</div>
      )}

      {todoItems.length === 0 && (
        <div className='no-elements'>Ooops! List is empty</div>
      )}
    </div>
  );
}

export default TodoList;
