import React, { useState } from "react";

const NewGenreForm = (props) => {
    const [newGenreFormNameValue, setNewGenreFormValue] = useState();

    function newGenreFormNameChangeHandler(event) {
        setNewGenreFormValue(event.target.value);
    }

    async function newGenreFormSubmitHandler(event) {
        event.preventDefault();
        const genreName = {
            genreName: newGenreFormNameValue
        }

        await fetch('catalog/genre/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(genreName)
        });
        
        props.getGenreList();
    }
    
    function newGenreFormCancelButtonHandler() {
        props.setAddNewGenre(false);
    }

    return (
        <div>
            <form onSubmit={newGenreFormSubmitHandler}>
                <label>New Genre Name<input type='text' name='newGenreFormNameField' value={newGenreFormNameValue} onChange={newGenreFormNameChangeHandler}/></label>
                <button type='submit'>Submit Genre</button>
                <button onClick={newGenreFormCancelButtonHandler}>Cancel</button>
            </form>
        </div>
    )
}

export default NewGenreForm;