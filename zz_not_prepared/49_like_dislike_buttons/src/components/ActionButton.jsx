import { useState } from 'react';
import './ActionButton.css';

const ActionButton = () => {
  const [likes, setLikes] = useState(100);
  const [dislikes, setDislikes] = useState(25);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
      if (disliked) {
        setDislikes(dislikes - 1);
        setDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDislikes(dislikes - 1);
      setDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      setDisliked(true);
      if (liked) {
        setLikes(likes - 1);
        setLiked(false);
      }
    }
  };

  return (
    <div>
      <button
        className={`like-button ${liked ? 'liked' : ''}`}
        onClick={handleLike}
      >
        Like | <span className='likes-counter'>{likes}</span>
      </button>
      <button
        className={`dislike-button ${disliked ? 'disliked' : ''}`}
        onClick={handleDislike}
      >
        Dislike | <span className='dislikes-counter'>{dislikes}</span>
      </button>
    </div>
  );
};

export default ActionButton;
