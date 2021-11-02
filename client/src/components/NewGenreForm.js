import React, { useState } from 'react';

const NewGenreForm = (props) => {
    const [newGenreName, setNewGenreName] = useState("");
    
    async function newGenreFormSubmitHandler(event) {
        event.preventDefault();
        let newGenreInput = {
            genreName: {newGenreName}
        }
        //console.log(newGenreInput);

        await fetch('catalog/genre/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGenreInput)
        });
        setNewGenreName("");
    }
    
    function newGenreNameChangeHandler(event) {
        setNewGenreName(event.target.value);
    }
    
    function newGenreFormCancelButtonClickHandler() {
        props.hideNewGenreForm();
    }
    
    return (
        <div>
            <form onSubmit={newGenreFormSubmitHandler}>
                <label>Genre Name<input type='text' name='newGenreFormNameInput' value={newGenreName} onChange={newGenreNameChangeHandler}/></label>
                <button type='submit'>Submit</button>
                <button onClick={newGenreFormCancelButtonClickHandler}>Cancel</button>
            </form>
        </div>
    )
}

export default NewGenreForm;