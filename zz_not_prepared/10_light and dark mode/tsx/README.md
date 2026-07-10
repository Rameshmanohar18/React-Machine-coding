### Summary of Changes

1. **File: `App.jsx` (converted to `App.tsx`)**
   - **Type Annotations**: Added `ThemeContextType` type definition to specify the structure of the context object, ensuring type safety.
   - **State Initialization**: Specified the type for the `theme` state as `string`.
   - **Context Type**: Updated `createContext` to use the `ThemeContextType` for better type safety when accessing the context in other components.

2. **File: `main.jsx` (converted to `main.tsx`)**
   - **Type Annotations**: Added `as HTMLElement` to the `document.getElementById('root')` query to ensure that the correct type is passed to `ReactDOM.createRoot`.
   - **React Import**: Explicitly added the `import React from 'react';` line to ensure compatibility and to avoid potential issues with older TypeScript setups.

