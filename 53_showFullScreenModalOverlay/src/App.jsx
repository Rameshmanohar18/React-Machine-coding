import { useState } from 'react';
import './App.css'; // Import the CSS file

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='modal-container'>
      <button onClick={openModal}>Open Modal</button>
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>
              &times;
            </span>
            <p>Modal Content Here...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

// Un-comment below for Priority based Modal Popup (Stacking Modals on top of each one)

// import { useState } from 'react';
// import Modal from './components/Modal';
// function App() {
//   // State to keep track of all open modals
//   const [modals, setModals] = useState([]); // Each modal: {id, content, priority}

//   // Function to close a modal by id
//   const closeModal = (id) => {
//     setModals((prev) => prev.filter((m) => m.id !== id));
//   };

//   // Function to open all modals (for demo/testing)
//   const openAllModals = () => {
//     setModals([
//       { id: 'low', content: 'Low Priority Modal', priority: 1 },
//       { id: 'medium', content: 'Medium Priority Modal', priority: 2 },
//       { id: 'high', content: 'High Priority Modal', priority: 3 },
//     ]);
//   };

//   // Sort modals by priority for stacking
//   const sortedModals = [...modals].sort((a, b) => a.priority - b.priority);

//   return (
//     <div>
//       <button onClick={openAllModals}>Open All Modals</button>
//       {/* Render all modals */}
//       {sortedModals.map(({ id, content, priority }, idx) => (
//         <Modal key={id} onClose={() => closeModal(id)} zIndex={1000 + idx}>
//           <div>
//             <strong>Priority: {priority}</strong>
//             <div>{content}</div>
//           </div>
//         </Modal>
//       ))}
//     </div>
//   );
// }

// export default App;
