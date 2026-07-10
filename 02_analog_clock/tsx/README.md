## To convert .jsx code to .tsx code

1. Renamed all the `.js` and `.jsx` files to `.ts` and `.tsx`.
2. Installed the following dependencies:
   ```bash
   npm install --save typescript
   ```
3. For `AnalogClock.tsx` file:
   - **Used `React.FC`**: Added `React.FC` to specify that `AnalogClock` is a functional component, providing type safety.

4. For `ClockHand.tsx` file:
   - **Added TypeScript Interface**: Created `ClockHandProps` interface to define the types for the `type` and `degrees` props.
   - **Used React.FC**: Added `React.FC<ClockHandProps>` for type safety in the functional component.

5. For `useClockHandDegrees.ts` file:
   - **Typed State**: Added `<Date>` to `useState` to specify that the `time` state is of type `Date`.
   - **Typed Parameters and Return Values**: Specified types for the parameters (`unit: number`, `maxUnits: number`) and return value (`number`) of the `getDegrees` function.

6. For `App.tsx` file:
   - **Used React.FC**: Added `React.FC` to define that `App` is a functional component, providing type safety.

7. For `main.tsx` file:
   - **Type Assertion**: Added a type assertion `(document.getElementById('root') as HTMLElement)` to ensure TypeScript knows that the element will not be null.


```js
These changes ensure type safety, better development experience, and compatibility with TypeScript.
```