import React, { useState, useContext } from "react";
import styles from '../NewElementForm.module.css';
import { AuthContext } from "../../context/auth-context";

const NewGenreForm = (props) => {
    const [newGenreFormNameValue, setNewGenreFormValue] = useState();
    const [validationErrors, setValidationErrors] = useState();
    const auth = useContext(AuthContext);

    function newGenreFormNameChangeHandler(event) {
        setNewGenreFormValue(event.target.value);
    }

    const newGenreFormSubmitHandler = async (event) => {
        event.preventDefault();
        const genreName = {
            genreName: newGenreFormNameValue
        }

        if (newGenreFormNameValue) {
            genreName = {...genreName, escapedGenreName: newGenreFormNameValue.replaceAll('\'', '\\\'')}
        }

        props.sendGenreNameUp(genreName.genreName);
        const response = await fetch('catalog/genre/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            },
            body: JSON.stringify(genreName)
        });
        const data = await response.json();

        if (typeof data === 'object') {
            if (data.name === 'TokenExpiredError') {
                auth.setIsLoggedIn(false);
            }
            if (data.hasOwnProperty('errors')) {
                const errorMessages = data.errors.map(element => element.msg);
                if (errorMessages.includes("SequelizeUniqueConstraintError")) {
                    props.setAddNewGenre(false);
                    props.setAddingDuplicateGenre(true);
                } else {
                    setValidationErrors(() => {
                        return errorMessages.map(element => <li>{element}</li>);
                    });
                }
            } else {
                props.setAddNewGenre(false);
                props.getGenreList();
            }
        }
        return data;
    }
    
    function newGenreFormCancelButtonHandler() {
        props.setAddNewGenre(false);
    }

    return (
        <div>
            <form id={styles.newElementForm} onSubmit={newGenreFormSubmitHandler}>
                <ul>{validationErrors}</ul>
                <label>New Genre Name<input type='text' name='newGenreFormNameField' value={newGenreFormNameValue} onChange={newGenreFormNameChangeHandler}/></label>
                <button type='submit'>Submit Genre</button>
                <button onClick={newGenreFormCancelButtonHandler}>Cancel</button>
            </form>
        </div>
    )
}

export default NewGenreForm;