// Write a wrapper component which counts number of times its child is clicked.

import {
  ChildButton,
  ClickCounterWrapper,
} from './components/ClickCounterWrapper';
// Usage
const App = () => (
  <ClickCounterWrapper>
    <ChildButton />
  </ClickCounterWrapper>
);

export default App;
