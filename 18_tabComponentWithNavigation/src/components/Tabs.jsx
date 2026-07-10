import { useState, useCallback } from 'react';
import Tab from './Tab';

const Tabs = () => {
  const TABS_DATA = [
    { id: 'tab-1', label: 'Tab 1', content: 'Content for tab 1' },
    { id: 'tab-2', label: 'Tab 2', content: 'Content for tab 2' },
    { id: 'tab-3', label: 'Tab 3', content: 'Content for tab 3' },
  ];
  const [activeTabId, setActiveTabId] = useState(TABS_DATA[0].id);
  const handleTabSelect = useCallback((id) => setActiveTabId(id), []);

  const activeTab = TABS_DATA.find((tab) => tab.id === activeTabId);

  return (
    <div className='container'>
      <div role='tablist' aria-label='Main tabs' className='tabs-header'>
        {TABS_DATA.map((tab) => (
          <Tab
            key={tab.id}
            id={tab.id}
            label={tab.label}
            isActive={tab.id === activeTabId}
            onSelect={handleTabSelect}
          />
        ))}
      </div>

      <div
        role='tabpanel'
        id={`panel-${activeTab.id}`}
        aria-labelledby={`tab-${activeTab.id}`}
        className='tab-content'
      >
        {activeTab.content}
      </div>
    </div>
  );
};

export default Tabs;
