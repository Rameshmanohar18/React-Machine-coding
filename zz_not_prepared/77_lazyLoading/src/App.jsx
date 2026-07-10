import React, { useState, Suspense, lazy } from 'react';
import './App.css';

// ==================== Lazy Load Component ====================
// Simulate lazy loading with delay
const PublishHandler = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div>
            <h3>Publish Panel Content</h3>
            <p>This content was lazy loaded!</p>
            <ul>
              <li>Only loads when you click the Publish tab</li>
              <li>Reduces initial bundle size</li>
              <li>Improves performance</li>
            </ul>
          </div>
        ),
      });
    }, 500); // 500 milli second delay to show loading state
  });
});

// ==================== Main App ====================
function App() {
  const [activeTab, setActiveTab] = useState('share');

  return (
    <div className='App'>
      <h1>Tab Component with Lazy Loading</h1>

      {/* Tab Buttons */}
      <div className='tab'>
        <button
          className={activeTab === 'share' ? 'active' : ''}
          role='tab'
          aria-selected={activeTab === 'share'}
          onClick={() => setActiveTab('share')}
        >
          Share
        </button>
        <button
          className={activeTab === 'publish' ? 'active' : ''}
          role='tab'
          aria-selected={activeTab === 'publish'}
          onClick={() => setActiveTab('publish')}
        >
          Publish (Lazy)
        </button>
      </div>

      {/* Tab Panels */}
      <div className='tab-panel'>
        {activeTab === 'share' && (
          <div role='tabpanel'>
            <h3>Share Panel Content</h3>
            <p>This content loads immediately - no lazy loading</p>
            <p>Perfect for critical content that users see first</p>
          </div>
        )}

        {activeTab === 'publish' && (
          <div role='tabpanel'>
            <Suspense fallback={<Loading />}>
              <PublishHandler />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== Loading Component ====================
function Loading() {
  return (
    <div className='loading'>
      <p>⏳ Loading content...</p>
    </div>
  );
}

export default App;
