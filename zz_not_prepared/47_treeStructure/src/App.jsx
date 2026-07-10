import React from 'react';

const Component = () => {
  // BELOW IS THE INPUT OBJECT,
  // REFER THE expectedOutput.png in the imagesUsed folder
  const exampleObj = {
    taxi: 'a car licensed to transport passengers in return for payment of a fare',
    food: {
      sushi:
        'a traditional Japanese dish of prepared rice accompanied by seafood and vegetables',
      apple: {
        Honeycrisp:
          'an apple cultivar developed at the MAES Horticultural Research Center',
        Fuji: 'an apple cultivar developed by growers at Tohoku Research Station',
      },
    },
  };

  const treeStructure = (object = {}) => (
    <div className='tree-container'>
      {/* Object.keys(exampleObj) returns an array (ex: ['taxi', 'food']) */}
      {Object.keys(object).map((ele) => (
        <>
          {/* exampleObj['taxi'] holds the value in string */}
          {typeof object[ele] === 'string' && (
            <span className='tree-label'>
              {/* ele is 'taxi' : object['taxi'] is the value */}
              {ele}: {object[ele]}
            </span>
          )}
          <br></br>

          {/* object[ele] means exampleObj['food'] which actually holds the value in object, 
           so that is the reason below condition gets executed */}
          {typeof object[ele] === 'object' && (
            <>
              {/* ele is 'food' */}
              <div className='tree-nestedobject'>{ele}:</div>

              {/* passing object['food'] recursively  */}
              {treeStructure(object[ele])}
            </>
          )}
        </>
      ))}
    </div>
  );

  // BELOW IS THE (LINE 1) OF CODE EXECUTION
  return <div className='main'>{treeStructure(exampleObj)}</div>;
};

export default Component;
