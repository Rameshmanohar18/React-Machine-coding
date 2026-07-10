import React, { useEffect, useRef } from 'react';

const TypingInput = ({ value, onChange, disabled }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  return (
    <input
      ref={inputRef}
      type='text'
      className='typing-input'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      placeholder='Start typing here...'
      autoComplete='off'
      spellCheck='false'
    />
  );
};

export default TypingInput;
