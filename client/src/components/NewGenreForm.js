import React, { useState } from 'react';

const NewGenreForm = (props) => {
    const [newGenreName, setNewGenreName] = useState("");
    
    function newGenreFormSubmitHandler(event) {
        event.preventDefault();
        let newGenreInput = {
            genreName: {newGenreName}
        }
        console.log(newGenreInput);
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