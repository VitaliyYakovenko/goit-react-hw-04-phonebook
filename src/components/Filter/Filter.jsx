import PropTypes from 'prop-types';
import { nanoid } from 'nanoid'
import css from "./Filter.module.css"



export default function Filter({value, onChange}) {
    const InputIdFilter = nanoid();

    return (
        <div className={css.phonebook__filter}>
            <label
            className={css.phonebook__label}
            htmlFor={InputIdFilter}>Find contacts by name</label>
            <input
            className={css.phonebook__input}
            onChange={onChange}
            type="text"
            name="filter"     
            value={value}
            id={InputIdFilter}
            >
            </input>
        </div>    
  )   
}

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange : PropTypes.func.isRequired,
}