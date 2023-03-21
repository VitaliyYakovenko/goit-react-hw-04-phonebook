import React, { Component } from "react";
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid'
import css from "./ContactForm.module.css"

class ContactForm extends Component {
    InputIdName = nanoid();
    InputIdPhone = nanoid();

    state = {
        name: '',
        number: '', 
    }; 
     
    oldName = [];
      
    static propTypes = {
            onSubmit: PropTypes.func.isRequired,
        contacts: PropTypes.arrayOf(
            PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }))
    }


    onInputChange = (e) => {
        const { name, value } = e.currentTarget
        this.setState({
        [name]: value,    
        })
    };

    onAddContact = (e) => {
        e.preventDefault();
    
        const {contacts} = this.props;


        if (contacts.find(contact => contact.name === this.state.name)) {
        alert(`${this.state.name} is already in contacts.`);
         this.reset();    
         return;
        };
        


        if (this.oldName.length === 0) {
            this.props.onSubmit(this.state);
        }

        

        if (this.oldName.length >= 1 && this.oldName.includes(this.state.name)) {
            let currentIndex = this.oldName.indexOf(this.state.name);
            alert(`${this.oldName[currentIndex]} is already in contacts`)
        }
    

        if (this.oldName.length >= 1 && !this.oldName.includes(this.state.name)) {
            this.props.onSubmit(this.state);     
        }
        
        this.oldName.push(this.state.name);
        
        this.reset();
    };
    

    reset = () => {
        this.setState({ name: "", number: "" });
   }


    
    render() {
         
        return (

            <form  
            className={css.phonebook__form}    
            onSubmit={this.onAddContact}
            >
            <label className={css.phonebook__label}
            htmlFor={this.InputIdName}>Name</label>    
            <input
            className={css.phonebook__input}        
            onChange={this.onInputChange}
            type="text"
            value={this.state.name}    
            name="name"    
            id={this.InputIdName}    
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            />
           <label className={css.phonebook__label}
            htmlFor={this.InputIdPhone}>Phone</label> 
            <input
            className={css.phonebook__input}
            onChange={this.onInputChange}
            type="tel"
            value={this.state.number}
            name="number"
            id={this.InputIdPhone}        
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
}

export default ContactForm;


