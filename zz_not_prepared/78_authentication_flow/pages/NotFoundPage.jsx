// 404 PAGE (Public)
const NotFoundPage = () => (
  <div style={styles.container}>
    <h1>404 - Not Found</h1>
    <Link to='/'>Go Home</Link>
  </div>
);

// ============================================
// 6. STYLES (Minimal for interview)
// ============================================
const styles = {
  container: {
    maxWidth: 400,
    margin: '50px auto',
    padding: 20,
    textAlign: 'center',
  },
};

export default NotFoundPage;
