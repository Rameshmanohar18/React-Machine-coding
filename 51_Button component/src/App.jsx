import React from 'react';
import Button from './components/Button';

const App = () => {
  return (
    <div>
      <Button
        text='Agree'
        variant='PRIMARY'
        onClickHandler={() => console.log('Primary button clicked')}
      />
      <Button
        text='Cancel'
        variant='SECONDARY'
        onClickHandler={() => console.log('Secondary button clicked')}
      />
    </div>
  );
};

export default App;
