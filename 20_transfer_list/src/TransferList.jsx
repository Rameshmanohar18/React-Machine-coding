import { useState } from 'react';
import { data } from './data';
import ListComponent from './components/ListComponent';

const TransferList = () => {
  const [listA, setListA] = useState(data);
  const [listB, setListB] = useState([]);

  const handleChange = (id, listName) => {
    const setList = listName === 'A' ? setListA : setListB;
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const transfer = (sourceList, setSource, setDestination) => {
    const toTransfer = sourceList
      .filter((item) => item.checked)
      .map((mappedItem) => ({ ...mappedItem, checked: false }));
    setDestination((dest) => dest.concat(toTransfer)); 
    setSource((source) => source.filter((item) => !item.checked)); // we have to filter out the selected items from List A right ?
  };


  // REDUCE LOGIC WHICH AVOIDS MULTIPLE ITERATIONS
  // const transfer = (sourceList, setSource, setDestination) => {
  //   const { toTransfer, remaining } = sourceList.reduce(
  //     (acc, item) => {
  //       item.checked
  //         ? acc.toTransfer.push({ ...item, checked: false })
  //         : acc.remaining.push(item);
  //       return acc;
  //     },
  //     { toTransfer: [], remaining: [] }
  //   );

  //   setDestination((dest) => [...dest, ...toTransfer]);
  //   setSource(remaining);
  // };

  return (
    <div className='transfer-list'>
      <ListComponent
        listData={listA}
        listType='A'
        handleChange={handleChange}
      />
      <div className='transfer-controls'>
        <button onClick={() => transfer(listA, setListA, setListB)}>
          &gt;
        </button>
        <button onClick={() => transfer(listB, setListB, setListA)}>
          &lt;
        </button>
      </div>

      <ListComponent
        listData={listB}
        listType='B'
        handleChange={handleChange}
      />
    </div>
  );
};

export default TransferList;
