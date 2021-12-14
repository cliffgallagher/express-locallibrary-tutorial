import React, { useState, useEffect, useContext } from "react";
import styles from '../ElementPopupForUpdate.module.css';
import { AuthContext } from "../../context/auth-context";

const GenrePopupForUpdate = (props) => {
    const [genreUpdateFormNameValue, setGenreUpdateFormNameValue] = useState();
    const [updatedGenreNameAlreadyExists, setUpdatedGenreNameAlreadyExists] = useState(false);
    const [validationErrors, setValidationErrors] = useState();
    const auth = useContext(AuthContext);

    async function getInitialGenreValues() {
        try {
            const response = await fetch(`catalog/genre/${props.genreID}/update`, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
            const data = await response.json();
            if (typeof data === 'object') {
                if (data.name === 'TokenExpiredError') {
                    auth.setIsLoggedIn(false);
                }
            }
            setGenreUpdateFormNameValue(data[0].name);
        } catch(e) {
            console.log(e);
        }
    }
    
    function genreUpdateFormCancelButtonClickHandler() {
        props.setDisplayElementPopupForUpdate(false);
    }

    function genreUpdateFormNameChangeHandler(event) {
        setGenreUpdateFormNameValue(event.target.value);
    }

    async function genreUpdateFormSubmitHandler(event) {
        event.preventDefault();
        const genreName = {
            genreName: genreUpdateFormNameValue
        };
        try {
            const response = await fetch(`catalog/genre/${props.genreID}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(genreName)
            });
            const data = await response.json();
            /*if (data === "SequelizeUniqueConstraintError") {
                //console.log("you did it again");
                setUpdatedGenreNameAlreadyExists(true);
            } else {
                props.setDisplayGenrePopupForUpdate(false);
                props.getGenreList();
            }*/
            if (typeof data === 'object') {
                if (data.name === 'TokenExpiredError') {
                    auth.setIsLoggedIn(false);
                }
                if (data.hasOwnProperty('errors')) {
                    //console.log("data.errors: " + JSON.stringify(data.errors));
                    const errorMessages = data.errors.map(element => element.msg);
                    if (errorMessages.includes("SequelizeUniqueConstraintError")) {
                        setUpdatedGenreNameAlreadyExists(true);
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
                    props.setDisplayElementPopupForUpdate(false);
                    props.setDisplayChosenElement(false);
                    props.setHideChosenElement(false);
                    props.getGenreList();
                }
            }
        } catch(e) {
            console.log(e);
        }
    }

    function duplicateGenreNameWarningCloseButtonHandler() {
        setUpdatedGenreNameAlreadyExists(false);
    }

    useEffect(() => {
        getInitialGenreValues();
    }, []);
    
    return <div className={styles.popup}>
    <div className={styles.popupInner}>
        {!updatedGenreNameAlreadyExists && <form onSubmit={genreUpdateFormSubmitHandler}>
            <ul>{validationErrors}</ul>
            <label>Genre Name<input type='text' name='genreUpdateFormNameField' value={genreUpdateFormNameValue} onChange={genreUpdateFormNameChangeHandler}/></label>
            <div id={styles.button_div}>
                <button type='submit'>Update</button><button onClick={genreUpdateFormCancelButtonClickHandler} id={styles.right_most_button}>Cancel</button>
            </div>

        </form>}
        {updatedGenreNameAlreadyExists && (
            <form>
                <p>Genre name {genreUpdateFormNameValue} already exists in the database.</p>
                <div id={styles.button_div}>
                    <button onClick={duplicateGenreNameWarningCloseButtonHandler}>Close</button>
                </div>
            </form>
        )}
    </div>
</div>
}

export default GenrePopupForUpdate;