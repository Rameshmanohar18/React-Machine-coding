// In App.jsx, I will be wrapping my ClickCounterWrapper component with open and close braces
// And inside to this component, I will be maintaining ChildButton component

// Ex:

<ClickCounterWrapper>
    <ChildButton/>
</ClickCounterWrapper>

// Step 1: Inside ClickCounterWrapper.jsx
// i) creating a context

const ClickContext = createContext(null);

// ii) our ClickCounterWrapper component accepts {children} as param
// iii) Inside to our ClickCounterWrapper, we are simply maintaining a count useState variable
// iv) an incrementClickCounterFunc
// v) return part is Context.Provider with value={incrementClickCounterFunc} and inside to the Provider we are showing count

<div>Click Count: {count}</div>
{children}

// vi) CORE LOGIC is our useContext logic
// vii) whatever the component is inside to the ClickCounterWrapper --> I mean as a children --> Below is the code

const handleClick = useContext(ClickContextVariable)
return <button onClick={handleClick}>Click Me</button>