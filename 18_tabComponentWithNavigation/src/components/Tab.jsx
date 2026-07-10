// Tab.jsx
const Tab = ({ label, id, isActive, onSelect }) => (
  <button
    role='tab'
    id={`tab-${id}`}
    aria-selected={isActive}
    aria-controls={`panel-${id}`}
    onClick={() => onSelect(id)}
    className={`tab-button ${isActive ? 'active' : ''}`}
  >
    {label}
  </button>
);

export default Tab;
