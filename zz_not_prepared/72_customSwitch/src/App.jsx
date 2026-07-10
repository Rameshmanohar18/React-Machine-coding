import { CustomSwitch, CustomCase, DefaultCase } from "./CustomSwitch";

const App = () => {
  return (
    <>
      {/* Test 1: Function case - "1000" < 10 is false, renders DefaultCase */}
      <CustomSwitch value="1000">
        <CustomCase value={(e) => e < 10}>
          <div>Less than 10</div>
        </CustomCase>
        <CustomCase value="20">Hello 20</CustomCase>
        <DefaultCase>Hello Default</DefaultCase>
      </CustomSwitch>
      {/* Output: Hello Default */}

      {/* Test 2: Primitive match */}
      <CustomSwitch value={20}>
        <CustomCase value={10}>Hello 10</CustomCase>
        <CustomCase value={20}>Hello 20</CustomCase>
        <DefaultCase>Default</DefaultCase>
      </CustomSwitch>
      {/* Output: Hello 20 */}

      {/* Test 3: Function case match */}
      <CustomSwitch value={5}>
        <CustomCase value={(e) => e < 10}>
          <span>Less than 10</span>
        </CustomCase>
        <CustomCase value={5}>Exact 5</CustomCase>
        <DefaultCase>Default</DefaultCase>
      </CustomSwitch>
      {/* Output: Less than 10 (first match wins) */}
    </>
  );
};

export default App;
