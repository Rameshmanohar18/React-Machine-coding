const Action = ({ handleClick, type }) => {
  return <button onClick={handleClick}>{type}</button>;
};

export default Action;
