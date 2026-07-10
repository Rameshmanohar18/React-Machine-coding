import React, { useState } from 'react';

function PasswordInput() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');

  const evaluateStrength = (password) => {
    let score = 0;

    const rules = [
      { regex: /.{9,}/, score: 2 }, // Increase score for length > 8 👉 👉 So: password must have AT LEAST 9 characters to earn +2
      { regex: /.{13,}/, score: 2 }, // Increase score for length > 12  👉 👉 A long password (13+) earns an EXTRA +2 on top of the previous rule
      { regex: /[a-z]/, score: 1 }, // Lowercase 👉 👉  Just needs ONE lowercase letter anywhere in the password
      { regex: /[A-Z]/, score: 1 }, // Uppercase 👉 👉 Just needs ONE uppercase letter anywhere in the password
      { regex: /[0-9]/, score: 1 }, // Digits 👉 👉 Just needs ONE digit anywhere in the password
      { regex: /[^A-Za-z0-9]/, score: 1 }, // Special characters  👉 👉  So: match anything that is NOT a letter or digit

      // This is 3 patterns joined by | (OR) — penalizes weak/predictable patterns

      // Pattern 1: (\d{3,})
      // \d     → any digit [0-9]
      // {3,}   → 3 or more times

      // Pattern 2: ([a-zA-Z]{3,})
      // [a-zA-Z] → any letter (upper or lower)
      // {3,}     → 3 or more times

      // Pattern 3: (.)\1{2,}
      // (.)   → capture group: matches ANY single character
      // \1    → backreference: same character that was captured
      // {2,}  → 2 or more additional times
      // Together: same character repeated 3+ times in a row
      // "aaa", "111", "!!!" → all penalized
      // "aab"               → ✅ only 2 a's, not penalized

      { regex: /(\d{3,})|([a-zA-Z]{3,})|(.)\1{2,}/, score: -1 }, // Penalize patterns
    ];

    rules.forEach((rule) => {
      if (rule.regex.test(password)) {
        score += rule.score;
      }
    });

    if (score <= 3) return 'Weak';
    if (score <= 5) return 'Moderate';
    return 'Strong';
  };

  const handleInputChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setStrength(evaluateStrength(newPassword));
  };

  return (
    <div>
      <input
        type='text'
        value={password}
        onChange={handleInputChange}
        placeholder='Enter password'
      />
      <div className={`password-strength ${strength.toLowerCase()}`}>
        {strength}
      </div>
    </div>
  );
}

export default PasswordInput;
