import logo from './logo.svg';
import './App.css';
import contactsFile from "./contacts.json";
import {useState} from "react";


function App() {

  const [contacts, setContacts] = useState(contactsFile.slice(0, 5));

  // const sortByName = () => {
  //   setContacts([...contacts.sort((a, b) => (a.name < b.name ? -1 : 1))]);
  // }

  const sortByName = () => {
    const sorted = [...contacts];
    sorted.sort((a, b) => a.name.localeCompare(b.name));

    setContacts(sorted)
  };

  const sortByPopularity = () => {
    setContacts([...contacts.sort((a, b) => (b.popularity > a.popularity ? 1 : -1))]);
  }
   
  // const sortByPopularity = () => {
  //   const sorted = contacts.slice();
  //   sorted.sort((a, b) => b.popularity - a.popularity);

  //   setContacts(sorted)
  // };

  // const addRandomContact = () => {
  //   const index = [Math.floor(Math.random() * contactsFile.length)];
  //   const randomContact = contactsFile[index];
  //   contactsFile.slice(index, 1);
  //   setContacts([...contacts, randomContact]);
  // }

  const addContact = () => {
    const random = contactsFile[Math.floor(Math.random() * contactsFile.length)];
    if (contacts.find(contact => contact.id === random.id)) {
      if (contacts.length < contactsFile.length) {
        addContact();
      }
      return;
    }
    setContacts(contacts => [random, ...contacts])
  };


  const deleteContact = contactId => {
    setContacts(contacts => contacts.filter(contact => contact.id !== contactId))
  };

  return (
    <div className="App">
    <h1>IronContacts</h1>
    <button onClick={addContact}>Add random contact</button>
    <button onClick={sortByName}>Sort by Name</button>
    <button onClick={sortByPopularity}>Add by Popularity</button>

<table>
  <thead>
      <tr>
        <th><h2>Picture</h2></th>
        <th><h2>Name</h2></th>
        <th><h2>Popularity</h2></th>
        <th><h2>wonOscar</h2></th>
        <th><h2>wonEmmy</h2></th>
        <th><h2>Actions</h2></th>

      </tr>
  </thead>

  {contacts.map((contact) => {
    return (
      <tbody>
        {/* <tr>
          <td><img src={contact.pictureUrl} alt='of an actor'/></td>
          <td>{contact.name}</td>
          <td>{contact.popularity}</td>
          <td>{contact.wonOscar ? '🏆' : ''}</td>
          <td>{contact.wonEmmy ? '🏆' : ''}</td>
        </tr> */}
        <tr key={contact.id}>
          <td>
            <img
              src={contact.pictureUrl}
              height='100px'
              alt={contact.name}
            />
          </td>
          <td>{contact.name}</td>
          <td>{contact.popularity}</td>
          <td>{contact.wonOscar && '🏆'}</td>
          <td>{contact.wonEmmy && '🏆'}</td>
          <td>
            <button onClick={() => { deleteContact(contact.id) }}>
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    )
  })}
</table>


    </div>
  );
}

export default App;
