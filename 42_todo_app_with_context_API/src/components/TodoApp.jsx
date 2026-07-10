import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';

const TodoApp = () => {
  const [inputText, setInputText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const { todos, addTodo, editTodo, deleteTodo, toggleTodo } = useTodos();

  const handleAddTodo = () => {
    if (inputText.trim()) {
      addTodo(inputText);
      setInputText('');
    }
  };

  const handleEditStart = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleEditSave = (id) => {
    if (editText.trim()) {
      editTodo(id, editText);
      setEditingId(null);
      setEditText('');
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  const handleToggle = (id) => {
    toggleTodo(id);
  };

  return (
    <div className='todo_app_container'>
      <h1>TODO App (Context API)</h1>

      <div>
        <input
          type='text'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder='Enter todo'
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <div>
                <input
                  type='text'
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleEditSave(todo.id)}>Save</button>
                <button onClick={handleEditCancel}>Cancel</button>
              </div>
            ) : (
              <div>
                <input
                  type='checkbox'
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                />
                <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                  }}
                >
                  {todo.text}
                </span>
                <button onClick={() => handleEditStart(todo)}>Edit</button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
