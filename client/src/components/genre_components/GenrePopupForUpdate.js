import React, { useState, useEffect } from "react";
import '../Popup.css';

const GenrePopupForUpdate = (props) => {
    const [genreUpdateFormNameValue, setGenreUpdateFormNameValue] = useState();
    const [updatedGenreNameAlreadyExists, setUpdatedGenreNameAlreadyExists] = useState(false);

    async function getInitialGenreValues() {
        try {
            const response = await fetch(`catalog/genre/${props.genreID}/update`);
            const data = await response.json();
            setGenreUpdateFormNameValue(data[0].name);
        } catch(e) {
            console.log(e);
        }
    }
    
    function genreUpdateFormCancelButtonClickHandler() {
        props.setDisplayGenrePopupForUpdate(false);
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
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(genreName)
            });
            const data = await response.json();
            if (data === "SequelizeUniqueConstraintError") {
                //console.log("you did it again");
                setUpdatedGenreNameAlreadyExists(true);
            } else {
                props.setDisplayGenrePopupForUpdate(false);
                props.getGenreList();
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
    
    return <div className='popup'>
    <div className='popup-inner'>
        {!updatedGenreNameAlreadyExists && <form onSubmit={genreUpdateFormSubmitHandler}>
            <label>Genre Name<input type='text' name='genreUpdateFormNameField' value={genreUpdateFormNameValue} onChange={genreUpdateFormNameChangeHandler}/></label>
            <button type='submit'>Update</button><button onClick={genreUpdateFormCancelButtonClickHandler}>Cancel</button>
        </form>}
        {updatedGenreNameAlreadyExists && (
            <form>
                <p>Genre name {genreUpdateFormNameValue} already exists in the database.</p>
                <button onClick={duplicateGenreNameWarningCloseButtonHandler}>Close</button>
            </form>
        )}
    </div>
</div>
}

export default GenrePopupForUpdate;