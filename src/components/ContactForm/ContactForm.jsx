import { useState } from "react";
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid'
import css from "./ContactForm.module.css"

export default function ContactForm({contacts, onSubmit}) {
      
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const InputIdName = nanoid();
    const InputIdPhone = nanoid();

 
    const onInputChange = (e) => {
        const { name, value } = e.currentTarget;
    
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                return;
        }
        
    };

    const onAddContact = (e) => {
        e.preventDefault();

        if (contacts.find(contact => contact.name === name)) {
        alert(`${name} is already in contacts.`);
         reset();    
         return;
        };
        onSubmit({ name, number });

        reset();
    };
    

    const reset = () => {
        setName("");
        setNumber("");
    } 
        

         
    return (
            <form  
            className={css.phonebook__form}    
            onSubmit={onAddContact}
            >
            <label className={css.phonebook__label}
            htmlFor={InputIdName}>Name</label>    
            <input
            className={css.phonebook__input}        
            onChange={onInputChange}
            type="text"
            value={name}    
            name="name"    
            id={InputIdName}    
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            />
           <label className={css.phonebook__label}
            htmlFor={InputIdPhone}>Phone</label> 
            <input
            className={css.phonebook__input}
            onChange={onInputChange}
            type="tel"
            value={number}
            name="number"
            id={InputIdPhone}        
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
             />
            <br/>
            <button
            className={css.phonebook__button}
            type="submit">Add contact</button>
        </form>
        )
}
    







ContactForm.propTypes = {
        onSubmit: PropTypes.func.isRequired,
        contacts: PropTypes.arrayOf(
            PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }))
    }













