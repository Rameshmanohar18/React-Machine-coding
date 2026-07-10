const ListComponent = ({ listData, listType, handleChange }) => (
  <div className='list-box'>
    <h3>{`List ${listType}`}</h3>
    <ul>
      {listData.map((item) => (
        <li key={item.id}>
          <label>
            <input
              type='checkbox'
              onChange={() => handleChange(item.id, listType)}
              checked={item.checked}
            />
            {item.name}
          </label>
        </li>
      ))}
    </ul>
  </div>
);

export default ListComponent;
