function Modal({ children, onClose }) {
  return (
    <div className='modal-backdrop'>
      <div className='modal-content'>
        <button className='modal-close' onClick={onClose}>
          X
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
