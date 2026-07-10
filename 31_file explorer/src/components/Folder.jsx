import { useState } from 'react';

function Folder({ handleInsertNode = () => {}, explorer }) {
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setShowInput({ visible: true, isFolder });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div className='folder-wrapper'>
        <div className='folder'>
          <span>📁 {explorer.name}</span>
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
          </div>
        </div>

        <div className='folder-contents'>
          {showInput.visible && (
            <div className='inputContainer'>
              <span>{showInput.isFolder ? '📁' : '📄'}</span>
              <input type='text' autoFocus onKeyDown={onAddFolder} />
            </div>
          )}

          {explorer.items.map((exp) => (
            <Folder
              key={exp.id}
              handleInsertNode={handleInsertNode}
              explorer={exp}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <span className='file'>📄 {explorer.name}</span>;
  }
}

export default Folder;
