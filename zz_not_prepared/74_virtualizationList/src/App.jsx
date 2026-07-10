import React from 'react';
import VirtualList from './VirtualList'; // wherever you saved it

const App = () => {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
  }));

  return (
    <div style={{ padding: '20px' }}>
      <h2>Virtualized List (10,000 items)</h2>
      <VirtualList
        items={items}
        itemHeight={60}
        buffer={10}
        containerHeight="600px"
        renderItem={(item) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              padding: '0 10px',
              borderBottom: '1px solid #eee',
            }}
          >
            <strong>{item.name}</strong>
            <span style={{ color: '#666' }}>{item.description}</span>
          </div>
        )}
      />
    </div>
  );
};

export default App;