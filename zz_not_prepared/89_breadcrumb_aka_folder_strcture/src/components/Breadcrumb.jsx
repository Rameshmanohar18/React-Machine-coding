export default function Breadcrumb({ path, onNavigate }) {
  return (
    <nav className='breadcrumb'>
      <button onClick={() => onNavigate(null)}>root</button>

      {path.map((node, i) => (
        <span key={node.id}>
          {' / '}
          <button
            className={i === path.length - 1 ? 'active' : ''}
            onClick={() => onNavigate(node.id)}
          >
            {node.name}
          </button>
        </span>
      ))}
    </nav>
  );
}
