import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import noteService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [showSome, setShowSome] = useState("");
  const [addMessage, setaddMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Render data from server
  useEffect(() => {
    noteService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  function areTheseObjectsEqual(first, second) {
    "use strict";
    // Taken from https://www.joshbritz.co/blog/why-its-so-hard-to-check-object-equality
    if (
      first === null ||
      first === undefined ||
      second === null ||
      second === undefined
    ) {
      return first === second;
    }

    if (first.constructor !== second.constructor) {
      return false;
    }

    if (first instanceof Function || first instanceof RegExp) {
      return first === second;
    }

    if (first === second || first.valueOf() === second.valueOf()) {
      return true;
    }

    if (first instanceof Date) return false;

    if (Array.isArray(first) && first.length !== second.length) {
      return false;
    }

    if (!(first instanceof Object) || !(second instanceof Object)) {
      return false;
    }

    const firstKeys = Object.keys(first);

    const allKeysExist = Object.keys(second).every(
      (i) => firstKeys.indexOf(i) !== -1
    );

    const allKeyValuesMatch = firstKeys.every((i) =>
      areTheseObjectsEqual(first[i], second[i])
    );

    return allKeysExist && allKeyValuesMatch;
  }

  // Function executed when a button in a form is clicked
  const addPerson = (event) => {
    event.preventDefault(); // Prevent to re-render the page when button is pressed
    const newPerson = {
      name: newName,
      number: newPhone,
      id: persons[persons.length - 1].id + 1,
    };

    const funcEqual = (element) => {
      const { id: ids, ...personWithoutId } = element;
      const { id: idNew, ...newPersonWithoutId } = newPerson;
      return areTheseObjectsEqual(personWithoutId, newPersonWithoutId);
    };
    // Way to see if some object in an array of objects are identical. True if there is some object identical to other
    const boolEqual = persons.some(funcEqual);

    if (boolEqual) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewPhone("");
    } else {
      noteService.create(newPerson).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewPhone("");
        setaddMessage(`Added ${newPerson.name}`);
        setTimeout(() => {
          setaddMessage(null);
        }, 5000);
      });
    }
  };

  const deletePerson = (id) => {
    let personToDelete = persons.find((person) => person.id === id);
    const indexPersonDelete = persons.indexOf(personToDelete);
    let personsWithoutPerson = persons.filter(
      (person) => person.id !== persons[indexPersonDelete].id
    );

    if (window.confirm(`Delete ${persons[indexPersonDelete].name}?`)) {
      noteService.deleteEl(id).then((response) => {
        setPersons(personsWithoutPerson);
        setErrorMessage(
          `Information of ${persons[indexPersonDelete].name} has already been removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
    }
  };

  // Functions to show text in input box when text is changed
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleShowSomeChange = (event) => {
    setShowSome(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addMessage} nameclass="add" />
      <Notification message={errorMessage} nameclass="error" />
      <Filter showSome={showSome} handle={handleShowSomeChange} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        valName={newName}
        valPhone={newPhone}
        onChangeName={handleNameChange}
        onChangePhone={handlePhoneChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        showSome={showSome}
        funcDelete={deletePerson}
      />
    </div>
  );
};

export default App;
