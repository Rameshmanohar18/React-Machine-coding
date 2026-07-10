## Step 1: Setup in `App.jsx`

### What we do:

- Render the `Register` component.

### Code:

```jsx
import Register from './Register';

function App() {
  return <Register />;
}

export default App;
```

---

## Step 2: Create `Register.jsx` Component

This component handles all the form validation and UI logic.

### State Declarations:

- For **Username**:
  - `userName`, `validName`, `userFocus`
- For **Password**:
  - `password`, `validPassword`, `passwordFocus`
- For **Confirm Password**:
  - `confirmPassword`, `validMatch`, `matchFocus`
- For **Success**:
  - `success` (boolean to track successful registration)

### Form JSX:

- **If Success**: Show success message and link to go back to form.
- **Else**: Show the form with inputs for:
  - Username
  - Password
  - Confirm Password
- **Inputs**:
  - `onChange` to update the value.
  - `onFocus` and `onBlur` to toggle validation hints.
- **Validation Hints**:
  - Show `p` tags with instructions when focus is true and validation is false.
- **Submit Button**:
  - Disabled unless all validations pass (`validName && validPassword && validMatch`).

### Code:

```jsx
import { useState, useEffect } from 'react';

function Register() {
  const [userName, setUserName] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setUserName('');
    setPassword('');
    setConfirmPassword('');
  };

  useEffect(() => {
    setValidName(isValidUserName(userName));
  }, [userName]);

  useEffect(() => {
    setValidPassword(isValidPassword(password));
    setValidMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  return (
    <section>
      {success ? (
        <div>
          <h1>Success! 🎉</h1>
          <button onClick={() => setSuccess(false)}>Go Back</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          {userFocus && !validName && (
            <p>
              4 to 24 characters. Must begin with a letter. Letters, numbers,
              underscores, hyphens allowed.
            </p>
          )}

          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />
          {passwordFocus && !validPassword && (
            <p>
              8 to 24 characters. Must include uppercase, lowercase, a number,
              and a special character.
            </p>
          )}

          <label htmlFor='confirm_pwd'>Confirm Password:</label>
          <input
            type='password'
            id='confirm_pwd'
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          {matchFocus && !validMatch && <p>Passwords must match.</p>}

          <button disabled={!(validName && validPassword && validMatch)}>
            Sign Up
          </button>
        </form>
      )}
    </section>
  );
}

export default Register;
```

---

## Step 3: Helper Validation Functions

These functions handle the core validation logic for username and password.

### `isValidUserName` Function:

- Conditions:
  - 4 to 24 characters.
  - Must start with a letter.
  - Only letters, numbers, hyphens (`-`), and underscores (`_`) allowed.

```jsx
function isValidUserName(userName) {
  if (userName.length < 4 || userName.length > 24) return false;
  if (!/^[A-Za-z]/.test(userName)) return false;
  if (!/^[A-Za-z0-9-_]+$/.test(userName)) return false;
  return true;
}
```

### `isValidPassword` Function:

- Conditions:
  - 8 to 24 characters.
  - At least one lowercase letter.
  - At least one uppercase letter.
  - At least one number.
  - At least one special character (e.g., `!@#$%^&*` etc.).

```jsx
function isValidPassword(password) {
  if (password.length < 8 || password.length > 24) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  if (!/[!@#$%^&*]/.test(password)) return false;
  return true;
}
```

---
