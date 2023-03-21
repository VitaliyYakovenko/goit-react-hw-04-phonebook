import React, { Component } from "react";
import { nanoid } from 'nanoid'
import css from "./App.module.css"
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";

class App extends Component {

  state = {
    contacts: [],
    filter: '',  
  };
  
  
  onGetContact = (data) => {
    
    const { name, number } = data
    
    const user = {
      id: 'id' + nanoid(),
      number,
      name,
    }

    this.setState(prevState => ({
      contacts: [user, ...prevState.contacts],
    }))
    
  };

  componentDidMount(nextProps, prevState) {
    const contacts = localStorage.getItem("contacts");
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      
      this.setState({ contacts: parseContacts });

    }
  }

   componentDidUpdate(prevProps, prevState) {
     
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
     
  }
  
 
  
  
   onChangeFilter = (e) => {
     this.setState({filter : e.currentTarget.value});
  };
  
  onDeleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  };

  render() { 

    const { contacts, filter} = this.state;

    

    const normalizedName = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedName));
      
          
    

    return (
       
      <div className={css.phonebook}>
        <div className={css.phonebook__inform}>
        <h1 className={css.phonebook__titel}>Phonebook</h1>
          <ContactForm
            contacts = {contacts}
            onSubmit={this.onGetContact}
          />

        </div>
        <h2>Contacts</h2>
        <Filter
        value={filter}
        onChange={this.onChangeFilter}    
        />
        <ContactList
          contacts={visibleContacts}
          onDelete = {this.onDeleteContact}
        />
      </div>  
    )
  }
};


export default App;

