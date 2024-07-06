const Persons = ({ persons, showSome, funcDelete }) => {
  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(showSome.toLowerCase(), 0)
  );
  return (
    <div>
      {personsToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => funcDelete(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
