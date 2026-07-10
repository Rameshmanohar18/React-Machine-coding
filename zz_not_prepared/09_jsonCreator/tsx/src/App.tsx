import React, { useState, useCallback } from 'react';
import JSONCreator from './components/JSONCreator';

const App: React.FC = () => {
  const [jsonStructure, setJsonStructure] = useState<any>({});
  const [jsonOutput, setJsonOutput] = useState<string>('');

  const handleDataChange = useCallback(
    (id: number, key: string, value: string, children: any[]) => {
      setJsonStructure({ [key]: value, children });
    },
    []
  );

  const handleGetJSON = () => {
    setJsonOutput(JSON.stringify(jsonStructure, null, 2));
  };

  return (
    <div className='container'>
      <JSONCreator
        id={0}
        data={jsonStructure}
        onDataChange={handleDataChange}
      />
      <button className='get-json-button' onClick={handleGetJSON}>
        Get JSON
      </button>
      <div>
        <textarea readOnly value={jsonOutput} rows={10} cols={50} />
      </div>
    </div>
  );
};

export default App;
