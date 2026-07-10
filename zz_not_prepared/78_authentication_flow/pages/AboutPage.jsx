import { Link } from 'react-router-dom';

// ABOUT PAGE (Public)
const AboutPage = () => (
  <div style={styles.container}>
    <h1>About Us</h1>
    <p>This is a public page accessible to everyone.</p>
    <Link to='/login'>Go to Login</Link>
  </div>
);

const styles = {
  container: {
    maxWidth: 400,
    margin: '50px auto',
    padding: 20,
    textAlign: 'center',
  },
};

export default AboutPage;
