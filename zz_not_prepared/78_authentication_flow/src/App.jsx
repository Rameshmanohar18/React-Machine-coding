import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Link,
} from 'react-router-dom';
import {
  AboutPage,
  DashboardPage,
  LoginPage,
  NotFoundPage,
  SignupPage,
} from '../pages';
import { AuthProvider, useAuth } from '../hooks/useAuth';

// Protected: Requires auth → redirect to /login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location.pathname }} replace />;
  }
  return children;
};

// Restricted: Only for unauthenticated → redirect to /dashboard if authenticated
const RestrictedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (isAuthenticated) {
    return <Navigate to='/dashboard' replace />;
  }
  return children;
};

// ============================================
// 5. APP WITH ROUTES
// ============================================
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav style={styles.nav}>
          <Link to='/' style={styles.link}>
            Home
          </Link>
          <Link to='/about' style={styles.link}>
            About
          </Link>
          <Link to='/dashboard' style={styles.link}>
            Dashboard
          </Link>
        </nav>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<AboutPage />} />
          <Route path='/about' element={<AboutPage />} />

          {/* Restricted Routes (only unauthenticated) */}
          <Route
            path='/login'
            element={
              <RestrictedRoute>
                <LoginPage />
              </RestrictedRoute>
            }
          />
          <Route
            path='/signup'
            element={
              <RestrictedRoute>
                <SignupPage />
              </RestrictedRoute>
            }
          />

          {/* Protected Routes (only authenticated) */}
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
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
  nav: {
    display: 'flex',
    gap: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  link: { textDecoration: 'none', color: '#333' },
};

export default App;
