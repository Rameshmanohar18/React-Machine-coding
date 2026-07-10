import { useState, useEffect, useRef } from 'react';
import './index.css';
import Stats from './components/Stats';
import Results from './components/Results';
import TextDisplay from './components/TextDisplay';
import TypingInput from './components/TypingInput';
import React from 'react';

const sampleTexts = [
  'The quick brown fox jumps over the lazy dog near the riverbank.',
  'Programming is the art of telling a computer what to do step by step.',
  'React makes it painless to create interactive user interfaces efficiently.',
  'Practice typing every day to improve your speed and accuracy greatly.',
];

const INITIAL_TIME = 30;

// ============ MAIN APP COMPONENT ============
const App = () => {
  // ---- State ----
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIME);
  const timerRef = useRef(null);

  const pickRandomText = () => {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    setText(sampleTexts[randomIndex]);
  };

  // ---- Initialize with random text ----
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    pickRandomText();
  }, []);

  // ---- Timer Logic (Countdown) ----
  useEffect(() => {
    if (isStarted && !isFinished) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isStarted, isFinished]);

  // ---- Calculate Stats ----
  const calculateStats = () => {
    if (userInput.length === 0) {
      return { wpm: 0, accuracy: 100, correctChars: 0 };
    }

    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === text[i]) {
        correctChars++;
      }
    }

    const accuracy = Math.round((correctChars / userInput.length) * 100);

    // WPM = (characters / 5) / minutes
    const timeSpent = INITIAL_TIME - timeRemaining;
    const minutes = timeSpent / 60 || 1 / 60; // Avoid division by zero
    const wpm = Math.round(correctChars / 5 / minutes);

    return { wpm, accuracy, correctChars };
  };

  const { wpm, accuracy, correctChars } = calculateStats();

  // ---- Handle Input Change ----
  const handleInputChange = (value) => {
    // Start timer on first keystroke
    if (!isStarted && value.length > 0) {
      setIsStarted(true);
    }

    // Prevent typing beyond text length
    if (value.length > text.length) {
      return;
    }

    setUserInput(value);

    // Check if text completed before time runs out
    if (value.length === text.length) {
      setIsFinished(true);
      clearInterval(timerRef.current);
    }
  };

  // ---- Restart Game ----
  const handleRestart = () => {
    setUserInput('');
    setIsStarted(false);
    setIsFinished(false);
    setTimeRemaining(INITIAL_TIME);
    pickRandomText();
  };

  const timeSpent = INITIAL_TIME - timeRemaining;

  return (
    <div className='app'>
      <h1>Typing Test</h1>

      {!isFinished ? (
        <>
          <Stats timeRemaining={timeRemaining} wpm={wpm} accuracy={accuracy} />
          <TextDisplay text={text} userInput={userInput} />
          <TypingInput
            value={userInput}
            onChange={handleInputChange}
            disabled={isFinished}
          />
          <p className='hint'>Start typing to begin the test</p>
        </>
      ) : (
        <Results
          wpm={wpm}
          accuracy={accuracy}
          correctChars={correctChars}
          totalChars={userInput.length}
          timeSpent={timeSpent}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default App;
