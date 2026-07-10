import { useState } from 'react';
import Action from './Action';

const Comment = ({ handleInsertNode, comment }) => {
  const [input, setInput] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);

  const onAddComment = () => {
    if (!input.trim()) return;
    handleInsertNode(comment.id, input);
    setInput('');
    setShowReplyInput(false);
  };

  return (
    <div className='commentWrapper'>
      {comment.id === 1 ? (
        // Root node: main comment input
        <div className='inputContainer'>
          <input
            type='text'
            placeholder='Add a comment...'
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Action type='COMMENT' handleClick={onAddComment} />
        </div>
      ) : (
        // Regular comment node
        <div className='commentContainer'>
          <span>{comment.name}</span>
          <Action
            type='REPLY'
            handleClick={() => setShowReplyInput(!showReplyInput)}
          />

          {showReplyInput && (
            <div className='inputContainer'>
              <input
                type='text'
                placeholder='Write a reply...'
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Action type='ADD' handleClick={onAddComment} />
              <Action
                type='CANCEL'
                handleClick={() => setShowReplyInput(false)}
              />
            </div>
          )}
        </div>
      )}

      {/* Recursively render replies */}
      {comment.items?.length > 0 && (
        <div className='repliesWrapper'>
          {comment.items.map((reply) => (
            <Comment
              key={reply.id}
              handleInsertNode={handleInsertNode}
              comment={reply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
