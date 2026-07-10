import Counter from './Counter';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

export default function App() {
  return (
    <Router>
      <div className='App'>
        <ErrorBoundary>
          <Counter />
        </ErrorBoundary>
      </div>
    </Router>
  );
}
