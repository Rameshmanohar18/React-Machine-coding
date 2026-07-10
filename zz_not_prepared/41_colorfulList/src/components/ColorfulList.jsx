import React, { useState } from 'react';

const ColorfulList = () => {
  const [text, setText] = useState('');
  const [color, setColor] = useState('#FF0000');
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    if (!text) {
      alert('Please enter some text');
      return;
    }
    const newItem = {
      id: new Date().getTime(),
      text,
      color,
    };
    setItems([...items, newItem]);
    setText('');
  };

  return (
    <div>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Type here...'
      />
      <select value={color} onChange={(e) => setColor(e.target.value)}>
        <option value='#FF0000'>Red</option>
        <option value='#00FF00'>Green</option>
        <option value='#0000FF'>Blue</option>
      </select>
      <button onClick={handleAddItem}>Add</button>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ color: item.color }}>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorfulList;
