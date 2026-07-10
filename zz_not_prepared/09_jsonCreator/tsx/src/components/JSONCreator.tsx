import React, { useState, useEffect, useCallback } from 'react';
import '../App.css';

type JSONCreatorProps = {
  id: number;
  data: any;
  onDataChange: (
    id: number,
    key: string,
    value: string,
    children: any[]
  ) => void;
};

type Child = {
  id: number;
  data: any;
};

const JSONCreator: React.FC<JSONCreatorProps> = React.memo(
  ({ id, data, onDataChange }) => {
    const [key, setKey] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const [children, setChildren] = useState<Child[]>([]);

    useEffect(() => {
      if (key !== '') {
        onDataChange(id, key, value, children);
      }
    }, [key, value, children, onDataChange, id]);

    const handleAdd = useCallback(() => {
      setChildren([...children, { id: Date.now(), data: {} }]);
    }, [children]);

    const handleRemove = useCallback(
      (childId: number) => {
        setChildren(children.filter((child) => child.id !== childId));
      },
      [children]
    );

    const handleChildChange = useCallback(
      (
        childId: number,
        childKey: string,
        childValue: string,
        childChildren: any[]
      ) => {
        setChildren((prevChildren) => {
          const updatedChildren = prevChildren.map((child) =>
            child.id === childId
              ? {
                  ...child,
                  data: { [childKey]: childValue, children: childChildren },
                }
              : child
          );

          // Check if the children array has actually changed
          if (
            JSON.stringify(updatedChildren) !== JSON.stringify(prevChildren)
          ) {
            return updatedChildren;
          }
          return prevChildren; // No change, return the original array
        });
      },
      []
    );

    return (
      <div className='json-container'>
        <input
          type='text'
          className='key'
          placeholder='key'
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <input
          type='text'
          className='value'
          placeholder='value'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className='add' onClick={handleAdd}>
          +
        </button>
        {children.map((child) => (
          <div key={child.id} className='sub-item'>
            <JSONCreator
              id={child.id}
              data={child.data}
              onDataChange={handleChildChange}
            />
            <button className='remove' onClick={() => handleRemove(child.id)}>
              x
            </button>
          </div>
        ))}
      </div>
    );
  }
);

export default JSONCreator;
