import React from "react";
import { nanoid } from "nanoid";
import PhonebookForm from "./PhonebookForm";
import Contacts from "./Contacts";
import Filter from "./Filter";


class App extends React.Component  {

  state = {
   contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
   filter:''
  }
  
  componentDidMount() { 
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

 componentDidUpdate(prevProps,prevState) { 
   if (this.state.contacts !== prevState.cntacts) { 
localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
    
   }
  }

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number
          };
    
      
    const validation = this.state.contacts.find(
      (contact) => contact.name === name)
  
    if (!validation) {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts]
      }));

      return
    }
  
    alert("You already have this contact in your phonebook")
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };
  
 filterContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render()  {
  const contactsToShow = this.filterContacts();
  
    return (
      <>
        <h1>Phonebook</h1>
        <PhonebookForm
            onSubmit={ this.addContact}/>
        
        <h2>Contacts</h2>
        <Filter
          value={this.filter}
          onChange={this.changeFilter}
              />
        <Contacts
          contacts={contactsToShow}
          onDeleteContact={this.deleteContact}/>
                  
      </>
    )
  } 
};

export default App

  // componentDidMount() {
  //   // console.log('App componentDidMount');

  //   const todos = localStorage.getItem('todos');
  //   const parsedTodos = JSON.parse(todos);

  //   if (parsedTodos) {
  //     this.setState({ todos: parsedTodos });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   // console.log('App componentDidUpdate');

  //   const nextTodos = this.state.todos;
  //   const prevTodos = prevState.todos;

  //   if (nextTodos !== prevTodos) {
  //     console.log('Обновилось поле todos, записываю todos в хранилище');
  //     localStorage.setItem('todos', JSON.stringify(nextTodos));
  //   }

  //   if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
  //     this.toggleModal();
  //   }
  // }