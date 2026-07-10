import React from 'react';

const TextDisplay = ({ text, userInput }) => {
  return (
    <div className='text-display'>
      {text.split('').map((char, index) => {
        let charClass = '';

        if (index < userInput.length) {
          charClass = userInput[index] === char ? 'correct' : 'incorrect';
        } else if (index === userInput.length) {
          charClass = 'current';
        }

        return (
          <span key={index} className={charClass}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default TextDisplay;
