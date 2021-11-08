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

        const response = await fetch('catalog/genre/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(genreName)
        });
        const data = await response.json();
        console.log("data in newGenreForm: " + JSON.stringify(data));
        if (data === 'SequelizeUniqueConstraintError') {
            console.log("you did it");
            props.setAddingDuplicateAuthor(true);
        } else {
            props.setAddNewGenre(false);
            props.getGenreList();
        }
        return data;
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