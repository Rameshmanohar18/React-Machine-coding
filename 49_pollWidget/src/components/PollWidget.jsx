import { useState } from 'react';
import PollOption from './PollOption';

export default function PollWidget({ poll }) {
  const [options, setOptions] = useState(poll.options);
  const [joinedId, setJoinedId] = useState(null);

  const totalVotes = options.reduce((sum, o) => sum + o.votes, 0);

  function handleJoin(id) {
    setOptions(
      options.map((o) => (o.id === id ? { ...o, votes: o.votes + 1 } : o))
    );
    setJoinedId(id);
  }

  function handleWithdraw() {
    setOptions(
      options.map((o) => (o.id === joinedId ? { ...o, votes: o.votes - 1 } : o))
    );
    setJoinedId(null);
  }

  return (
    <div className='poll-widget'>
      <h2 className='poll-question'>{poll.question}</h2>

      <div className='poll-options'>
        {options.map((option) => {
          // Round to nearest whole number for clean display
          const percent =
            totalVotes === 0
              ? 0
              : Math.round((option.votes / totalVotes) * 100);

          return (
            <PollOption
              key={option.id}
              option={option}
              percent={percent}
              isJoined={joinedId === option.id}
              onJoin={handleJoin}
              onWithdraw={handleWithdraw}
            />
          );
        })}
      </div>

      {/* Total votes shown at the bottom center, formatted with commas */}
      <p className='poll-total'>{totalVotes.toLocaleString()} votes</p>
    </div>
  );
}
