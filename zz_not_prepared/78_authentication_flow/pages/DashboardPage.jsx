import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// DASHBOARD PAGE (Protected)
const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h1>Dashboard</h1>
      <p>
        Welcome, <strong>{user?.username}</strong>!
      </p>
      <p>Email: {user?.email}</p>
      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
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
  button: {
    padding: 12,
    fontSize: 16,
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
};

export default DashboardPage;
