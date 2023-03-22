import { useState,useEffect } from "react";
import { nanoid } from 'nanoid'
import css from "./App.module.css"
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
const KEY = "contacts";


export default function App() { 

  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  });
  
  const [filter, setFilter] = useState("");
  
  const onAddContact = (data) => {
    const { name, number } = data
    const user = {
      id: 'id ' + nanoid(),
      name,
      number,
    }
   
    setContacts(prev => [...prev, user]);

  }

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(contacts));
  },[contacts]);
  

  const onDeleteContact = (contactId) => {
    setContacts((contacts.filter(contact => contact.id !== contactId)));
   };
     
  
  const onChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  const normalizedName = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
  contact.name.toLowerCase().includes(normalizedName));
    

  return (
      <div className={css.phonebook}>
         <div className={css.phonebook__inform}>
         <h1 className={css.phonebook__titel}>Phonebook</h1>
        <ContactForm
          contacts={contacts}
          onSubmit={onAddContact}
        />
         </div>
         <h2>Contacts</h2>
         <Filter
         value={filter}
         onChange={onChangeFilter}    
         />
        <ContactList
        contacts={visibleContacts}
        onDelete={onDeleteContact} />   
       </div>  
   )
}

