import React, { useState, useEffect } from "react";
import '../Popup.css';

const GenrePopupForDelete = (props) => {
    const [genreToDelete, setGenreToDelete] = useState();
    const [receivedForeignKeyConstraintError, setReceivedForeignKeyConstraintError] = useState(false);
    const [validationErrors, setValidationErrors] = useState();

    async function getGenreDeleteFormValues() {
        try {
            const response = await fetch(`catalog/genre/${props.genreID}/delete`);
            const data = await response.json();
            //console.log(JSON.stringify(data));
            setGenreToDelete(data[0].name);
        } catch(e) {
            console.log(e);
        }
    }

    async function genreDeleteFormSubmitHandler(event) {
        event.preventDefault();
        const response = await fetch(`catalog/genre/${props.genreID}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(JSON.stringify(data));
        /*if (data === "SequelizeForeignKeyConstraintError") {
            setReceivedForeignKeyConstraintError(true);
        } else {
            props.setDisplayGenrePopupForDelete(false);
            props.getGenreList();
        }*/
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
            props.setDisplayGenrePopupForDelete(false);
            props.getGenreList();
        }
    }

    useEffect(() => {
        getGenreDeleteFormValues();
    }, []);
    
    function genreDeleteFormCancelHandler() {
        props.setDisplayGenrePopupForDelete(false);
    }

    function foreignKeyWarningCloseButtonHandler() {
        setReceivedForeignKeyConstraintError(false);
        props.setDisplayGenrePopupForDelete(false);
    }

    return (
        <div className='popup'>
            <div className='popup-inner'>
                {!receivedForeignKeyConstraintError && (
                    <form onSubmit={genreDeleteFormSubmitHandler}>
                        <p>Are you sure you wish to delete this genre?</p>
                        <h1>{genreToDelete}</h1>
                        <button type='submit'>Delete</button><button onClick={genreDeleteFormCancelHandler}>Cancel</button>
                </form>
                )}
                {receivedForeignKeyConstraintError && (
                    <form>
                        <h3>You're attempting to delete the genre of a book currently stored in the database.</h3>
                        <h3>Please delete the book or update it with a different genre before deleting this genre.</h3>
                        <button onClick={foreignKeyWarningCloseButtonHandler}>Close</button>
                    </form>
                )}
                
            </div>
        </div>
    )
}

export default GenrePopupForDelete;