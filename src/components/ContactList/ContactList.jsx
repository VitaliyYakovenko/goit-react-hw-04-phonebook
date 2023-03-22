import PropTypes from 'prop-types';
import css from "./ContactList.module.css"


export default function ContactList({ contacts, onDelete }) {
  
    return (
        <ul className={css.phonebook__list}>
          {contacts.map(contact => (
        <li
        className={css.phonebook__item}  
        key={contact.id}>
        <span
        className={css.phonebook__name}        
        >{contact.name}</span>
        <span>{contact.number}</span>
              <button
        className={css.phonebook__deleteBtn}        
        onClick={() => onDelete(contact.id)}>Delete</button>      
          </li>
        ))}
        </ul>
    )
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
     })
  ),
  onDelete : PropTypes.func.isRequired,
}



