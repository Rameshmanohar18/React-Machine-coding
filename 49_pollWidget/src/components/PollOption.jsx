// option      = { id, label, votes }
// percent     = vote percentage (0–100) — drives the fill bar width
// isJoined    = true if user voted for THIS option (shows blue border)
// onJoin      = called with option.id when user clicks to vote
// onWithdraw  = called when user clicks their already-voted option to cancel
export default function PollOption({
  option,
  percent,
  isJoined,
  onJoin,
  onWithdraw,
}) {
  function handleClick() {
    // Toggle: if already joined this option → withdraw, otherwise → join
    isJoined ? onWithdraw() : onJoin(option.id);
  }

  return (
    // The whole row is clickable — it acts as both the button and the bar container
    <div
      className={`poll-row ${isJoined ? 'poll-row--selected' : ''}`}
      onClick={handleClick}
    >
      {/* Blue fill: sits behind the text using absolute positioning.
          Width is dynamic (runtime data) so one inline style is unavoidable here. */}
      <div className='poll-row__fill' style={{ width: `${percent}%` }} />

      {/* Text layer sits above the fill bar via z-index */}
      <div className='poll-row__content'>
        <span className='poll-row__label'>
          {option.label}
          {/* Vote count in muted color, right next to the label */}
          <span className='poll-row__count'>
            {option.votes.toLocaleString()}
          </span>
        </span>
        <span className='poll-row__percent'>{percent}%</span>
      </div>
    </div>
  );
}
