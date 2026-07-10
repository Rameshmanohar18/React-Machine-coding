function ClockHand({ type, degrees }) {
  return (
    <div
      className={`hand ${type}`}
      style={{ transform: `rotate(${degrees}deg)` }}
    ></div>
  );
}

export default ClockHand;
