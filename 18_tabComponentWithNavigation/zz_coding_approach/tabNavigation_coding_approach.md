##  Step 1: Setup in `App.jsx`

### What we do:

- Directly render the `Tabs` component.

### Code:

```jsx
import Tabs from './Tabs';

function App() {
  return <Tabs />;
}

export default App;
```

---

##  Step 2: Create `Tabs.jsx` Component

This component manages the active tab and its content.

### What we do:

- **useState** for managing `activeTab`, defaulting to the first tab (`1`).
- **Content Object**:
  - Keys are tab numbers (`1`, `2`, `3`, etc.)
  - Values are the content for each tab.
- **Return JSX**:
  - Parent `div` as container.
  - `tabs-container` with two sections:
    - `tabs-header`: Displays all the tabs.
    - `tab-content`: Displays content based on `activeTab`.

### Code:

```jsx
import { useState } from 'react';
import Tab from './Tab';

function Tabs() {
  const [activeTab, setActiveTab] = useState(1);

  const content = {
    1: 'Content for Tab 1',
    2: 'Content for Tab 2',
    3: 'Content for Tab 3',
  };

  return (
    <div className='container'>
      <div className='tabs-container'>
        <div className='tabs-header'>
          <Tab label='Tab 1' id={1} setActiveTab={setActiveTab} />
          <Tab label='Tab 2' id={2} setActiveTab={setActiveTab} />
          <Tab label='Tab 3' id={3} setActiveTab={setActiveTab} />
        </div>
        <div className='tab-content'>{content[activeTab]}</div>
      </div>
    </div>
  );
}

export default Tabs;
```

✅ **Highlights**:

- Clicking a tab will update `activeTab`, and the respective content will display.

---

##  Step 3: Create `Tab.jsx` Component

This component represents each individual tab button.

### What we do:

- Accept props: `label`, `id`, `setActiveTab`.
- Handle click to set the active tab.

### Code:

```jsx
function Tab({ label, id, setActiveTab }) {
  const handleClick = () => {
    setActiveTab(id);
  };

  return <button onClick={handleClick}>{label}</button>;
}

export default Tab;
```

✅ **Highlights**:

- When you click the button, `setActiveTab(id)` will update the active tab state.

---
