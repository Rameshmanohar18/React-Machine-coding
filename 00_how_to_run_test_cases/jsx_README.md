## To write test cases using jest and RTL
1. Make sure to install all the below dependencies 

```js
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @testing-library/jest-dom @testing-library/react @types/jest babel-jest identity-obj-proxy jest jest-environment-jsdom
```
-----

2. In the scripts section of package.json, make sure to add this

```js
"test": "jest"
```
-----

3. Create a **`.babel.rc`** file in **`src`** folder

```js
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```
-----

4. Create a **`setupTests.js`** file in **`src`** folder

```js
import '@testing-library/jest-dom';
```
-----

5. Create a **`jest.config.js`** file in **`root`** folder

```js
export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
  },
};
```
-----


## 6. Procedure to see whether test cases are passed or failed

### Procedure - 1
- right click on the **jsx_testCases** folder and select **Open in Integrated terminal**
- Type **npm test** command in vs-code terminal and click **enter**

----

### Procedure - 2
- click on the **`+`** icon on vscode-terminal and select **Javascript Debug terminal**
<img src="./imagesUsed/Javascript Debug Terminal.png">

- **`Right`** click on the **jsx_testCases** folder and select **Copy Relative Path** option
<img src="./imagesUsed/Copy Relative Path.png">

- Now do the **Ctrl + V** on **Javascript Debug Terminal (vscode)** and click **`enter`**, for example REFER BELOW

```js
//ex:
cd 01_accordion/jsx_testCases
npm test
```
- run the **npm test** command

----

### Procedure - 3

- **`Install`** the **Jest extension (Orta)** in vs-code
<img src="./imagesUsed/Jest_Extension.png">


- Post installation for the first time, **`close`** your vscode application completely and then **`open`** it
- Now go to any **`.test.jsx`** file and right click anywhere in that code file and select **`Jest: Run Related Tests`** option
- This is my own favorite to identify particular failed/passed test case(s)

<img src="./imagesUsed/Jest Run Related Tests.png">

- Additionally you will also see the **entire tree** of the your application test cases by clicking on the Lab icon.

<img src="./imagesUsed/overview_of_tests.png">

----
