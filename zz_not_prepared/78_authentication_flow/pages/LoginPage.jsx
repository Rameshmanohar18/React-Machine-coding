import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// LOGIN PAGE (Restricted)
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, oauthLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleOAuth = async (provider) => {
    setLoading(true);
    try {
      await oauthLogin(provider);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type='submit' disabled={loading} style={styles.button}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <div style={styles.oauth}>
        <button onClick={() => handleOAuth('google')} style={styles.oauthBtn}>
          Google
        </button>
        <button onClick={() => handleOAuth('github')} style={styles.oauthBtn}>
          GitHub
        </button>
      </div>
      <p>
        Don't have account? <Link to='/signup'>Sign up</Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 400,
    margin: '50px auto',
    padding: 20,
    textAlign: 'center',
  },
  form: { display: 'flex', flexDirection: 'column', gap: 10 },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #ccc',
  },
  button: {
    padding: 12,
    fontSize: 16,
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  error: { color: 'red', marginBottom: 10 },
  oauth: {
    display: 'flex',
    gap: 10,
    justifyContent: 'center',
    margin: '15px 0',
  },
  oauthBtn: { padding: '10px 20px', cursor: 'pointer' },
};

export default LoginPage;
