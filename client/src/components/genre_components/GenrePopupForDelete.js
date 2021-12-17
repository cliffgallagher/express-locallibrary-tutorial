import React, { useState, useEffect, useContext } from "react";
import styles from '../Popup.module.css';
import { AuthContext } from "../../context/auth-context";

const GenrePopupForDelete = (props) => {
    const [genreToDelete, setGenreToDelete] = useState();
    const [receivedForeignKeyConstraintError, setReceivedForeignKeyConstraintError] = useState(false);
    const [validationErrors, setValidationErrors] = useState();
    const auth = useContext(AuthContext);

    async function getGenreDeleteFormValues() {
        try {
            const response = await fetch(`catalog/genre/${props.genreID}/delete`, {
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
            //console.log(JSON.stringify(data));
            setGenreToDelete(data[0].name);
        } catch(e) {
            //console.log(e);
        }
    }

    async function genreDeleteFormSubmitHandler(event) {
        event.preventDefault();
        const response = await fetch(`catalog/genre/${props.genreID}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            }
        });
        const data = await response.json();
        //console.log(JSON.stringify(data));
        /*if (data === "SequelizeForeignKeyConstraintError") {
            setReceivedForeignKeyConstraintError(true);
        } else {
            props.setDisplayGenrePopupForDelete(false);
            props.getGenreList();
        }*/
        if (data.name === 'TokenExpiredError') {
            auth.setIsLoggedIn(false);
        }
        if (data.hasOwnProperty('errors')) {
            //console.log("data.errors: " + JSON.stringify(data.errors));
            const errorMessages = data.errors.map(element => element.msg);
            if (errorMessages.includes("SequelizeForeignKeyConstraintError")) {
                setReceivedForeignKeyConstraintError(true);
            } else {
                //console.log("errorMessages: " + JSON.stringify(errorMessages));
                setValidationErrors(() => {
                    return errorMessages.map(element => <li>{element}</li>);
                });
            }
            //console.log("errorMessages: " + JSON.stringify(errorMessages));
        } else {
            props.setDisplayElementPopupForDelete(false);
            props.setDisplayChosenElement(false);
            props.setHideChosenElement(false);
            props.getGenreList();
        }
    }

    useEffect(() => {
        getGenreDeleteFormValues();
    }, []);
    
    function genreDeleteFormCancelHandler() {
        props.setDisplayElementPopupForDelete(false);
    }

    function foreignKeyWarningCloseButtonHandler() {
        setReceivedForeignKeyConstraintError(false);
        props.setDisplayElementPopupForDelete(false);
    }

    return (
        <div className={styles.popup}>
            <div className={styles.popup_inner} id={styles.popup_for_delete}>
                {!receivedForeignKeyConstraintError && (
                    <form onSubmit={genreDeleteFormSubmitHandler}>
                        <h1>Are you sure you wish to delete this genre?</h1>
                        <h3>{genreToDelete}</h3>
                        <div id={styles.button_div}>
                            <button type='submit'>Delete</button><button onClick={genreDeleteFormCancelHandler} id={styles.right_most_button}>Cancel</button>
                        </div>
                </form>
                )}
                {receivedForeignKeyConstraintError && (
                    <form>
                        <h3>You're attempting to delete the genre of a book currently stored in the database.</h3>
                        <h3>Please delete the book or update it with a different genre before deleting this genre.</h3>
                        <div id={styles.button_div}>
                            <button onClick={foreignKeyWarningCloseButtonHandler}>Close</button>
                        </div>
                    </form>
                )}
                
            </div>
        </div>
    )
}

export default GenrePopupForDelete;