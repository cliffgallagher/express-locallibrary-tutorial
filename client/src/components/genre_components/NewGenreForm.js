import React, { useState } from "react";
import styles from '../NewElementForm.module.css';

const NewGenreForm = (props) => {
    const [newGenreFormNameValue, setNewGenreFormValue] = useState();
    const [validationErrors, setValidationErrors] = useState();

    function newGenreFormNameChangeHandler(event) {
        setNewGenreFormValue(event.target.value);
    }

    async function newGenreFormSubmitHandler(event) {
        event.preventDefault();
        const genreName = {
            genreName: newGenreFormNameValue
        }

        const response = await fetch('catalog/genre/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(genreName)
        });
        const data = await response.json();
        /*console.log("data in newGenreForm: " + JSON.stringify(data));
        if (data === 'SequelizeUniqueConstraintError') {
            console.log("you did it");
            props.setAddNewGenre(false);
            props.setAddingDuplicateAuthor(true);
        } else {
            props.setAddNewGenre(false);
            props.getGenreList();
        }*/
        if (typeof data === 'object') {
            if (data.hasOwnProperty('errors')) {
                //console.log("data.errors: " + JSON.stringify(data.errors));
                const errorMessages = data.errors.map(element => element.msg);
                if (errorMessages.includes("SequelizeUniqueConstraintError")) {
                    props.setAddNewGenre(false);
                    props.setAddingDuplicateGenre(true);
                } else {
                    //console.log("errorMessages: " + JSON.stringify(errorMessages));
                    setValidationErrors(() => {
                        return errorMessages.map(element => <li>{element}</li>);
                    });
                }
                //console.log("errorMessages: " + JSON.stringify(errorMessages));
            } else {
                // figure out
                //console.log("book inserted");
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