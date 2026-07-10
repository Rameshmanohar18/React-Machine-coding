import { useState } from 'react';

export default function DiceRoller() {
  // State to track number of dice to roll (default: 6)
  const [numberOfDice, setNumberOfDice] = useState(6);

  // State to store the results of dice rolls
  const [diceResults, setDiceResults] = useState([]);

  // Function to roll dice and generate random results
  const rollDice = () => {
    const results = [];
    // Generate random number (1-6) for each die
    for (let i = 0; i < numberOfDice; i++) {
      results.push(Math.floor(Math.random() * 6) + 1);
    }
    setDiceResults(results);
  };

  // Function to handle input changes and validate range (1-12)
  const handleNumberChange = (e) => {
    const value = parseInt(e.target.value);
    // Only update if value is between 1 and 12
    if (value >= 1 && value <= 12) {
      setNumberOfDice(value);
    }
  };

  // Function to render a single die with dots based on value
  const renderDie = (value, index) => {
    return (
      <div key={index} className='die'>
        <div className={`dots dots-${value}`}>
          {/* Render dots based on dice value */}
          {Array.from({ length: value }, (_, i) => (
            <div key={i} className={`dot dot-${i + 1}`}></div>
          ))}
        </div>
      </div>
    );
  };

  // Function to render dice results in rows of 3
  const renderDiceInRows = () => {
    const rows = [];
    // Split dice results into chunks of 3
    for (let i = 0; i < diceResults.length; i += 3) {
      const rowDice = diceResults.slice(i, i + 3);
      rows.push(
        <div key={i} className='dice-row'>
          {rowDice.map((value, index) => renderDie(value, i + index))}
        </div>
      );
    }
    return rows;
  };

  return (
    <>
      <div className='container'>
        <h2 className='title'>Number of Dice</h2>

        {/* Input section for number of dice and roll button */}
        <div className='input-section'>
          <input
            type='number'
            min='1'
            max='12'
            value={numberOfDice}
            onChange={handleNumberChange}
            className='input-field'
          />
          <button onClick={rollDice} className='roll-button'>
            Roll
          </button>
        </div>

        {/* Display dice results only if we have rolled */}
        {diceResults.length > 0 && (
          <div className='dice-container'>{renderDiceInRows()}</div>
        )}
      </div>
    </>
  );
}
