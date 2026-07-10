// In App.jsx, I will simply write TypeAhead.jsx
// In TypeAhead.jsx component
// Step 1: useState declaration 
// i) 1st useState variable --> is for query that user types
// ii) 2nd useState variable --> is for results array (API Call results)
// iii) 3rd useState variable ---> is for loading (API Call loading)

// Step 2: If I directly jump on return jsx part, then 
// i) I will be maintaining input with type text, onChange of setQuery(e.target.value)
// ii) inside ul, I will be doing apiResultsArrVariable.map and I want to show img and anchor tag for routing to user github page

// Step 3: CORE logic of typeAhead
// i) I will be maintaining a minLength variable to avoid api calls (ex: 3 should be the min no. of characters that user has to type to trigger an API call)
// ii) My logic is placed inside setTimeout
// iii) if query.length >= minLength then setLoading to true, fetchUsersFunc(queryParam, signalParam).then().catch()
// iv) else, setResults array to [] and setLoading to false
// v) additionally we are using AbortController to cancel api calls