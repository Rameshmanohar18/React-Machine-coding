## To convert .jsx code to .tsx code

1. Renamed all the .js and .jsx files to .ts and .tsx
2. Installed the following dependencies
```js
npm install --save typescript
```
3. For Accordion.tsx file

   - Added TypeScript Interface to **`specify`** the types of the props (AccordionProps)
   - Used React.FC for **type safety**
  
4. For App.tsx file
   - Added TypeScript Interface (DataItem)
   - **Typed State**: Used TypeScript types for the state with useState.
   - Used React.FC

5. For main.tsx file
     - Added a type assertion **(document.getElementById('root') as HTMLElement)** to ensure TypeScript knows the element will not be null.
     