// Functional component to display the list
const NamesList = ({ names }) => {
  // Function to group names by the first letter
  const groupNamesByLetter = (names) => {
    return names.reduce((acc, name) => {
      // Ex: "Ava"[0].toUpperCase() will be "A"
      let firstLetter = name[0].toUpperCase();

      //if our acc object doesn't have the (ex: "A")
      if (!acc[firstLetter]) {
        // we are storing in our acc object with key as 'A' and value as ["Ava"],
        // ex: acc: {A: ['Ava']}
        acc[firstLetter] = [name];
      } else {
        // if acc object already has (ex: 'A') then simply push the name into key (ex: 'A')
        // ex: acc: {A: ['Ava', 'Anthony']}
        acc[firstLetter].push(name);
      }
      return acc;
    }, {});
  };

  // Grouped names object looks like below
  /* groupedNames: {
    "A": [
        "Ava",
        "Anthony"
    ],
    "B": [
        "Baddon",
        "Baen"
    ],
    "C": [
        "Caley",
        "Caellum"
    ]
} */
  const groupedNames = groupNamesByLetter(names);

  return (
    <div className='names-list'>
      {/* Object.keys will output ['A', 'B', 'C'] */}
      {/* we are performing "map" on that*/}
      {Object.keys(groupedNames).map((letter) => (
        <div key={letter}>
          {/* and we are showing each letter/alphabet at first, ex: A */}
          <div className='letter-group'>{letter}</div>

          {/* that each letter/alphabet, we are now performing lookup on groupedNames object, ex: groupedNames['A'] will return array of respective alphabet names, ex: "A" has "Ava", "Anthony" */}
          {groupedNames[letter].map((name) => (
            // here name means (ex: 'Ava')
            <div key={name} className='name'>
              {name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NamesList;
